/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { commonCreateDto } from 'src/common/dtos/common.dto';

export class createProductDto extends commonCreateDto {
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  brandId: number;

  @IsNumber()
  buyingPrice: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  quantity: number;

  @IsEnum(['kilo', 'gram', 'centimeter', 'meter', 'feet', 'piece'], {
    message: 'valid unit required',
  })
  unit: string;

  @IsNumber()
  @IsOptional()
  subCategoryId?: number;

  @IsNumber()
  @IsOptional()
  materialId?: number;

  @IsString()
  @IsOptional()
  extraFields?: string;
}
