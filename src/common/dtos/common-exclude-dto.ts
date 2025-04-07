import { Exclude } from 'class-transformer';

export class CommonExcludeDto {
  @Exclude()
  updatedAt: Date;

  @Exclude()
  createdAt: Date;
}
