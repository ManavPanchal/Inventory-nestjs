import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { SubCategoryModule } from './modules/subcategory/subcategory.module';
import { MaterialModule } from './modules/material/material.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    SubCategoryModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
