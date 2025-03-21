import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { commonCreateDto } from 'src/common/dtos/common.dto';
import { Category } from 'src/database/enitities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  findAll(): Promise<Category[]> {
    try {
      return this.categoryModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(
    categoryId: string | number,
    name?: string,
  ): Promise<Category | null> {
    try {
      return this.categoryModel.findOne({
        where: {
          ...(categoryId
            ? { id: categoryId }
            : { name: { [Op.like]: `%${name}%` } }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(categoryDetails: commonCreateDto): Promise<Category> {
    try {
      const name = categoryDetails.name;
      const checkIfCategoryExists = await this.categoryModel.findOne({
        where: { name: { [Op.like]: `%${name}%` } },
      });

      if (checkIfCategoryExists)
        throw new Error(`Category with same name: ${name} already exists`);

      return this.categoryModel.create(categoryDetails);
    } catch (error) {
      throw new Error(error);
    }
  }
}
