import { SubCategory } from 'src/database/enitities/subcategory.entity';

export class FetchCategoryResponseDto {
  name: string;
  id: any;
  subCategories?: SubCategory[];
}
