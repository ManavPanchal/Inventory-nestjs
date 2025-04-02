import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class UserCreateDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
  phone: string;

  @IsString()
  password: string;

  @IsString()
  address: string;
}
