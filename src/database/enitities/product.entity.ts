import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { SubCategory } from './subcategory.entity';
import { Material } from './material.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'products' })
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Category)
  @BelongsTo(() => Category, { as: 'category' })
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'category_id' })
  categoryId: number;

  @ForeignKey(() => Brand)
  @BelongsTo(() => Brand, { as: 'brand' })
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'brand_id' })
  brandId: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true, field: 'price' })
  buyingPrice: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, field: 'buying_price' })
  sellingPrice: number | null;

  @Column({ type: DataType.INTEGER, allowNull: false, field: 'stock_quantity' })
  quantity: number;

  @Column({ type: DataType.STRING, allowNull: false })
  unit: string;

  @ForeignKey(() => SubCategory)
  @BelongsTo(() => SubCategory, { as: 'subCategory' })
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'sub_category_id' })
  subCategoryId: number | null;

  @ForeignKey(() => Material)
  @BelongsTo(() => Material, { as: 'material' })
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'material_id' })
  materialId: number | null;

  @Column({ type: DataType.STRING, allowNull: true, field: 'extra_fields' })
  extraFields: string | null;
}
