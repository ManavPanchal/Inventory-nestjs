import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { commonCreateDto, commonUpdateDto } from 'src/common/dtos/common.dto';
import { Category } from 'src/database/enitities/category.entity';
import { FetchAllCategoryInputDto } from './dto/fetch-input-dto';
import { FetchCategoryResponseDto } from './dto/response-dto';
import { SubCategoryService } from '../subcategory/subcategory.service';
import { SubCategory } from 'src/database/enitities/subcategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    private readonly subCategoryService: SubCategoryService,
  ) {}

  async findAll(
    fetchAllInputDto: FetchAllCategoryInputDto,
  ): Promise<FetchCategoryResponseDto[] | Category[]> {
    const { limit, page, where, withSubCategories } = fetchAllInputDto;

    const paginationPayload = { limit: 10, offset: 0 };
    if (page && limit) {
      paginationPayload.limit = limit;
      paginationPayload.offset = page * limit - limit;
    }

    const categories = await this.categoryModel.findAll({
      where,
      ...paginationPayload,
      attributes: ['id', 'name'],
    });
    if (!withSubCategories) return categories;

    const responsePayload: Promise<FetchCategoryResponseDto>[] = categories.map(
      async (category: Category) => {
        const subCategories: SubCategory[] =
          await this.subCategoryService.findAll({
            withCategoryId: category.id as number,
          });

        return {
          id: category.dataValues.id as number,
          name: category.dataValues.name,
          subCategories,
        };
      },
      [],
    );

    return await Promise.all(responsePayload);
  }

  async findOne(
    id?: number | string,
    name?: string,
    withSubCategories?: boolean,
    where?: WhereOptions,
  ): Promise<FetchCategoryResponseDto | Category | null> {
    const category = await this.categoryModel.findOne({
      where: {
        ...(id ? { id } : { name: { [Op.like]: `%${name}%` } }),
      },
      // include: [{ model: SubCategory, as: 'subcategories' }],
      ...where,
      attributes: ['id', 'name'],
    });

    if (!withSubCategories) return category;

    let responsePayload: FetchCategoryResponseDto = { id, name: '' };
    if (category) {
      responsePayload = {
        id,
        name: category.dataValues.name,
      };

      const subCategories = await this.subCategoryService.findAll({
        withCategoryId: id as number,
      });

      responsePayload.subCategories = subCategories;
    }

    return responsePayload;
  }

  async create(categoryDetails: commonCreateDto): Promise<Category> {
    const name = categoryDetails.name;
    const checkIfCategoryExists = await this.findOne();

    if (checkIfCategoryExists)
      throw new ConflictException(`category exist with name ${name}`);

    return this.categoryModel.create(categoryDetails);
  }

  async update(
    categoryId: number,
    categoryDetails: commonUpdateDto,
  ): Promise<Category | null> {
    const category = (await this.findOne(categoryId)) as Category;
    if (category) {
      await category.update({ name: categoryDetails.name });
      await category.save();
    }
    return category;
  }

  async delete(categoryId: number): Promise<boolean> {
    const category = (await this.findOne(categoryId)) as Category;
    await category?.destroy();
    return true;
  }
}
