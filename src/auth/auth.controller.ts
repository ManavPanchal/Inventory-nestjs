import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { LoginRequestDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    request: LoginRequestDto,
  ) {
    return await this.authService.login(request);
  }

  @Post('signup')
  async signup(
    @Body(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    request: UserCreateDto,
  ) {
    return await this.authService.signup(request);
  }
}
