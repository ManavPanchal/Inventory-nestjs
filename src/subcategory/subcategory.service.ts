import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InferAttributes, Op, WhereOptions } from 'sequelize';
import { SubCategory } from 'src/database/enitities/subcategory.entity';
import { Category } from 'src/database/enitities/category.entity';
import { createSubCategoryDto } from './dtos/subcategory.dto';
import { FetchAllSubCategoriesInputDto } from './dtos/fetch-all-input-dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory) private subCategoryModel: typeof SubCategory,
  ) {}

  findAll(
    fetchAllSubCategoriesInputDto: FetchAllSubCategoriesInputDto,
  ): Promise<SubCategory[]> {
    try {
      const {
        withCategoryId,
        where: wherePayload,
        limit,
        page = 1,
      } = fetchAllSubCategoriesInputDto;

      let where: WhereOptions<
        InferAttributes<
          SubCategory,
          {
            omit: never;
          }
        >
      > = {};

      const paginationPayload = { limit: 10, offset: 0 };
      if (page && limit) {
        paginationPayload.limit = limit;
        paginationPayload.offset = page * limit - limit;
      }

      if (withCategoryId) where.category_id = withCategoryId;

      if (wherePayload) where = { ...where, ...wherePayload };
      console.log(withCategoryId);

      return this.subCategoryModel.findAll({ where, ...paginationPayload });
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
        include: [{ model: Category, as: 'category' }],
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
        throw new ConflictException(`sub-category exist with name ${name}`);

      console.log(subCategoryDetails);

      const newSubCategory: InferAttributes<SubCategory> = {
        name,
        category_id: subCategoryDetails.categoryId,
      };

      return this.subCategoryModel.create(newSubCategory);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
