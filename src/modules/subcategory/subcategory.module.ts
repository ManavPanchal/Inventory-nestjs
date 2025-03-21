import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategoryController } from './subcategory.controller';
import { SubCategoryService } from './subcategory.service';
import { SubCategory } from 'src/database/enitities/subcategory.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubCategory])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SequelizeModule],
})
export class SubCategoryModule {}
