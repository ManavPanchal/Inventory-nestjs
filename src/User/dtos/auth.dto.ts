import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsPhoneNumber()
  @AtLeastOne('email', { message: 'Either phone or email must be provided' })
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  password: string;
}
