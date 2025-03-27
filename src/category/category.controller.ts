import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/database/enitities/category.entity';
import { commonUpdateDto } from 'src/common/dtos/common.dto';
import { SubCategoryService } from '../subcategory/subcategory.service';
import { SubCategory } from 'src/database/enitities/subcategory.entity';
import { FetchCategoryInputDto } from './dto/fetch-input-dto';
import { FetchCategoryResponseDto } from './dto/response-dto';
import { createCategoryDto } from './dto/create-category-dto';

interface createCategoryResponsePayload {
  name: string;
  id: number | string;
  subCategories?: SubCategory[];
}

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
  ) {}

  @Get()
  async getCategories(): Promise<FetchCategoryResponseDto[] | Category[]> {
    return this.categoryService.findAll({ withSubCategories: true });
  }

  @Get(':categoryId')
  async getCategory(
    @Param('categoryId') categoryId: string,
    @Query() query: FetchCategoryInputDto,
  ): Promise<FetchCategoryResponseDto | null> {
    const { name } = query;
    return (await this.categoryService.findOne(
      categoryId,
      name,
      true,
    )) as FetchCategoryResponseDto;
  }

  @Post()
  async createCategory(
    @Body(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: createCategoryDto,
  ): Promise<createCategoryResponsePayload | null> {
    const { name, subCategories } = body;
    const category = await this.categoryService.create({ name });

    const responsePayload: createCategoryResponsePayload = {
      name: category.dataValues.name,
      id: category.id as number,
    };

    if (category && subCategories) {
      const promises = subCategories.map((subCategory) =>
        this.subCategoryService.create({
          name: subCategory,
          categoryId: category.id as number,
        }),
      );

      const sub_categories = await Promise.all(promises);
      responsePayload.subCategories = sub_categories;
    }
    return responsePayload;
  }

  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(ValidationPipe) body: commonUpdateDto,
  ): Promise<Category | null> {
    return await this.categoryService.update(categoryId, body);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) categoryId: number,
  ): Promise<boolean> {
    return await this.categoryService.delete(categoryId);
  }
}
