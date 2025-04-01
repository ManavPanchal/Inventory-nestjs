import { WhereOptions } from 'sequelize';
import { UserService } from './user/user.service';
import { User } from 'src/database/enitities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from './auth.util';
import { UserCreateDto } from 'src/auth/user/user.dto';

interface LoginRequest {
  password: string;
  email: string;
  phone: string;
}

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginRequest: LoginRequest) {
    const { email, password, phone } = loginRequest;

    const where: WhereOptions<User> = {};
    let errorMessage = '';
    if (phone) {
      where.phone = phone;
      errorMessage = 'No account found with this phone. Please sign up.';
    } else if (email) {
      where.email = email;
      errorMessage = 'No account found with this phone. Please sign up.';
    }

    const user = await this.userService.get(undefined, where);

    if (!user) throw new NotFoundException(errorMessage);

    const isValidCredential = await compare(password, user.passwordDigest);
    if (!isValidCredential)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async signup(signupRequest: UserCreateDto) {
    return this.userService.create(signupRequest);
  }
}
