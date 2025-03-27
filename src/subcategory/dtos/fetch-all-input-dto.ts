import { InferAttributes, WhereOptions } from 'sequelize';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SubCategory } from 'src/database/enitities/subcategory.entity';

export class FetchAllSubCategoriesInputDto extends PaginationDto {
  withCategoryId?: number;
  where?: WhereOptions<
    InferAttributes<
      SubCategory,
      {
        omit: never;
      }
    >
  > = {};
}
