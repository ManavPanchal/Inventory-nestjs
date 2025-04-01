import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { MaterialModule } from './material/material.module';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ProductModule,
    SubCategoryModule,
    CategoryModule,
    BrandModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
