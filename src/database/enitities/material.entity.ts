import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'materials', timestamps: false }) // Define table name
export class Material extends Model<
  InferAttributes<Model>,
  InferCreationAttributes<Model>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
