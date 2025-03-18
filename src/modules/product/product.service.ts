import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/database/enitities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }
}
