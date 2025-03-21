import { commonCreateDto } from 'src/common/dtos/common.dto';

export class createProductDto extends commonCreateDto {
  categoryId?: number;
  brandId: number;
  buyingPrice: number;
  price?: number;
  quantity: number;
  unit: string;
  subCategoryId?: number;
  materialId: number;
  extraFields?: string;
}
