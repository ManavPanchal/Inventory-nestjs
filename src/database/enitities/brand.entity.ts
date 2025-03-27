import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'brands', timestamps: false })
export class Brand extends Model<
  InferAttributes<Brand>,
  InferCreationAttributes<Brand>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
