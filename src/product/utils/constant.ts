import { InferAttributes } from 'sequelize';
import { Brand } from 'src/database/enitities/brand.entity';
import { Category } from 'src/database/enitities/category.entity';
import { Material } from 'src/database/enitities/material.entity';
import { Product } from 'src/database/enitities/product.entity';
import { SubCategory } from 'src/database/enitities/subcategory.entity';

export const productAttributes: Array<keyof InferAttributes<Product>> = [
  'id',
  'name',
  // 'brandId',
  // 'categoryId',
  'quantity',
  'sellingPrice',
  // 'subCategoryId',
  'unit',
  'extraFields',
  // 'materialId',
];

export const ProductRelations = [
  { model: Category, as: 'category' },
  // { model: SubCategory, as: 'subCategory' },
  { model: Material, as: 'material' },
  { model: Brand, as: 'brand' },
];
