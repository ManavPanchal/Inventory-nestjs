import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { SubCategory } from './subcategory.entity';
import { Material } from './material.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'products' }) // Define table name
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
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER, allowNull: true })
  brand_id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  price: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  buying_price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock_quantity: number;

  @Column({ type: DataType.STRING, allowNull: false })
  unit: string;

  @ForeignKey(() => SubCategory)
  @Column({ type: DataType.INTEGER, allowNull: true })
  sub_category_id: number;

  @ForeignKey(() => Material)
  @Column({ type: DataType.INTEGER, allowNull: true })
  material_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  extra_fields: string;
}
