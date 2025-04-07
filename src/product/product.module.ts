import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/database/enitities/product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [SequelizeModule],
})
export class ProductModule {}
