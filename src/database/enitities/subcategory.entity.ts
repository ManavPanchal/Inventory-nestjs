import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'subcategories', timestamps: false })
export class SubCategory extends Model<
  InferAttributes<SubCategory>,
  InferCreationAttributes<SubCategory>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @BelongsTo(() => Category, { as: 'category' })
  category_id: number;
}
