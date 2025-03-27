import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class commonCreateDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;
}
export class commonUpdateDto extends PartialType(commonCreateDto) {}
