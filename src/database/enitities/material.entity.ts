import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'materials', timestamps: false }) // Define table name
export class Material extends Model<Material> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
