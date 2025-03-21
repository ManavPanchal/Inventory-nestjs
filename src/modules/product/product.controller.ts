import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from 'src/database/enitities/product.entity';
import { ProductService } from './product.service';
import { createProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  async getProduct(
    @Param('productId') productId: string,
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
  async createProduct(@Body() body: createProductDto): Promise<Product | null> {
    return this.productService.create(body);
  }
}
