import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { MaterialModule } from './material/material.module';
import { GlobalException } from './common/filters/GlobalException.filter';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    SubCategoryModule,
    CategoryModule,
    BrandModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [{ provide: 'APP_FILTER', useClass: GlobalException }, AppService],
})
export class AppModule {}
