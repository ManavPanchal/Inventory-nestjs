import { WhereOptions } from 'sequelize';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FetchCategoryInputDto {
  id?: string | number;
  name?: string;
  withSubCategories?: boolean = false;
}

export class FetchAllCategoryInputDto extends PaginationDto {
  withSubCategories?: boolean = false;
  where?: WhereOptions;
}
