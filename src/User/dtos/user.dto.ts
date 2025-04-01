import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { USER_ROLE } from '../user.utils';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsEnum(USER_ROLE)
  role: USER_ROLE;
}
