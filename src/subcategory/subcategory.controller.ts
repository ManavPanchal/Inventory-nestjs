import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubCategory } from 'src/database/enitities/subcategory.entity';
import { SubCategoryService } from './subcategory.service';
import { createSubCategoryDto } from './dtos/subcategory.dto';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  async getCategories(): Promise<SubCategory[]> {
    return this.subCategoryService.findAll({});
  }

  @Get(':subCategoryId')
  async getCategory(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: string,
  ): Promise<SubCategory | null> {
    return this.subCategoryService.findOne(subCategoryId);
  }

  @Post()
  async createCategory(
    @Body() body: createSubCategoryDto,
  ): Promise<SubCategory | null> {
    return await this.subCategoryService.create(body);
  }
}
