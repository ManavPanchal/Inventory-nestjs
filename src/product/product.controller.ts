import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from 'src/database/enitities/product.entity';
import { ProductService } from './product.service';
import { createProductDto, ProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  async getProduct(
    @Param('productId', ParseIntPipe) productId: string,
  ): Promise<Product | null> {
    try {
      const product: Product | null =
        await this.productService.findOne(productId);

      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post()
  async createProduct(
    @Body(ValidationPipe) body: createProductDto,
  ): Promise<ProductDto | null> {
    return this.productService.create(body);
  }
}
