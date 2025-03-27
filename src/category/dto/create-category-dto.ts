/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsOptional } from 'class-validator';
import { commonCreateDto } from 'src/common/dtos/common.dto';

export class createCategoryDto extends commonCreateDto {
  @IsArray({
    message:
      'suncategories should contain lists of subcategories lies under new category',
  })
  @IsOptional()
  subCategories: string[];
}
