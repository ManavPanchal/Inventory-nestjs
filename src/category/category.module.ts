import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from 'src/database/enitities/category.entity';
import { SubCategoryService } from '../subcategory/subcategory.service';
import { SubCategoryModule } from '../subcategory/subcategory.module';

@Module({
  imports: [SequelizeModule.forFeature([Category]), SubCategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService, SubCategoryService],
  exports: [SequelizeModule],
})
export class CategoryModule {}
