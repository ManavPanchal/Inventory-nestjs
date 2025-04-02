import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { AtLeastOne } from 'src/common/dtos/at-least-one.decorator';

export class LoginRequestDto {
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
  @AtLeastOne('email', { message: 'Either phone or email must be provided' })
  phone!: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  password: string;
}
