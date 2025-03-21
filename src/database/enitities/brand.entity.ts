import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'brands', timestamps: false }) // Define table name
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
