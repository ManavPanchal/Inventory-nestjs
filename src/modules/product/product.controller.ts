import { Controller, Get, Param, Req } from '@nestjs/common';
import { Product } from 'src/database/enitities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Req() req): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string): string {
    console.log(productId);
    return productId;
  }
}
