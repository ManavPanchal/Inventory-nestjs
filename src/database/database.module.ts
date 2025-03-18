import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfigOptions } from './config/config';
import { Product } from './enitities/product.entity';
import { Category } from './enitities/category.entity';
import { SubCategory } from './enitities/subcategory.entity';
import { Brand } from './enitities/brand.entity';
import { Material } from './enitities/material.entity';
import { Config } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...sequelizeConfigOptions,
      dialect: 'postgres',
      models: [Product, Category, Brand, Material],
      autoLoadModels: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
