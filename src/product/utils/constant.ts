import { InferAttributes } from 'sequelize';
import { Product } from 'src/database/enitities/product.entity';

export const productAttributes: Array<keyof InferAttributes<Product>> = [
  'id',
  'name',
  'brandId',
  'categoryId',
  'quantity',
  'sellingPrice',
  'subCategoryId',
  'unit',
  'extraFields',
  'materialId',
];
