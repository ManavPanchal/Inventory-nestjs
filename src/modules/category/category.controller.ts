import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/database/enitities/category.entity';
import { commonCreateDto } from 'src/common/dtos/common.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':categoryId')
  async getCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Category | null> {
    return this.categoryService.findOne(categoryId);
  }

  @Post()
  async createCategory(
    @Body() body: commonCreateDto,
  ): Promise<Category | null> {
    return await this.categoryService.create(body);
  }
}
