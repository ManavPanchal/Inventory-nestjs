import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';
import { LoginRequestDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/auth/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    )
    request: LoginRequestDto,
  ) {
    await this.authService.login(request);
  }

  @Post('signup')
  async signup(
    @Body(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
      }),
    )
    request: UserCreateDto,
  ) {
    await this.authService.signup(request);
  }
}
