import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'brands', timestamps: false }) // Define table name
export class Brand extends Model<Brand> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
