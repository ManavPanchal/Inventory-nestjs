import { commonCreateDto } from 'src/common/dtos/common.dto';

export class createSubCategoryDto extends commonCreateDto {
  categoryId: number;
}
