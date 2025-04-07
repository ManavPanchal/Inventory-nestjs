import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategoryController } from './subcategory.controller';
import { SubCategoryService } from './subcategory.service';
import { SubCategory } from 'src/database/enitities/subcategory.entity';
import { Category } from 'src/database/enitities/category.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([SubCategory, Category])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SequelizeModule],
})
export class SubCategoryModule {}
