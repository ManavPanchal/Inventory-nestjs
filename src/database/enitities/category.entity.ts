import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'categories', timestamps: false }) // Define table name
export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
