import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber(undefined, { always: false })
  phone: string;

  @IsString()
  password: string;

  @IsString()
  address: string;
}
