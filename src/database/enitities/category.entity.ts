import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { SubCategory } from './subcategory.entity';

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

  // @HasMany(() => SubCategory, {
  //   foreignKey: 'category_id',
  //   as: 'subCategories',
  // })
  // subCategories: SubCategory[];
}
