import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InferAttributes, Op } from 'sequelize';
import { SubCategory } from 'src/database/enitities/subcategory.entity';
import { createSubCategoryDto } from './dtos/subcategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory) private subCategoryModel: typeof SubCategory,
  ) {}

  findAll(): Promise<SubCategory[]> {
    try {
      return this.subCategoryModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(
    subCategoryId?: string | number,
    name?: string,
  ): Promise<SubCategory | null> {
    try {
      return this.subCategoryModel.findOne({
        where: {
          ...(subCategoryId
            ? { id: subCategoryId }
            : { name: { [Op.like]: `%${name}%` } }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(subCategoryDetails: createSubCategoryDto): Promise<SubCategory> {
    try {
      const name = subCategoryDetails.name;
      const checkIfSubCategoryExists = await this.findOne(undefined, name);

      if (checkIfSubCategoryExists)
        throw new Error(`SubCategory with same name: ${name} already exists`);

      const newSubCategory: InferAttributes<SubCategory> = {
        name,
        category_id: subCategoryDetails.categoryId,
      };

      return this.subCategoryModel.create(newSubCategory);
    } catch (error) {
      throw new Error(error);
    }
  }
}
