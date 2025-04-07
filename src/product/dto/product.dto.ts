/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CommonExcludeDto } from 'src/common/dtos/common-exclude-dto';
import { commonCreateDto } from 'src/common/dtos/common.dto';

export class createProductDto extends commonCreateDto {
  @IsNumber()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  brandId: number | null;

  @IsNumber()
  buyingPrice: number;

  @IsNumber()
  @IsOptional()
  sellingPrice: number | null;

  @IsNumber()
  quantity: number;

  @IsEnum(['kilo', 'gram', 'centimeter', 'meter', 'feet', 'piece'], {
    message: 'valid unit required',
  })
  unit: string;

  @IsNumber()
  @IsOptional()
  subCategoryId: number | null;

  @IsNumber()
  @IsOptional()
  materialId: number | null;

  @IsString()
  @IsOptional()
  extraFields: string | null;
}

@Exclude()
export class ProductDto extends CommonExcludeDto {
  @Expose()
  id?: number;

  @Expose()
  name: string;

  @Expose()
  category_id: number;

  @Expose()
  brand_id: number | null;

  @Expose()
  sellingPrice: number;

  @Expose()
  stock_quantity: number | null;

  @Exclude()
  buying_price: number | null;

  @Expose()
  unit: string;

  @Expose()
  sub_category_id: number | null;

  @Expose()
  material_id: number | null;
}
