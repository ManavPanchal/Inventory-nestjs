import { WhereOptions } from 'sequelize';
import { UserService } from '../user/user.service';
import { User } from 'src/database/enitities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, getToken } from './auth.util';
import { UserCreateDto } from 'src/user/user.dto';
import { DEFAULT_USER_ATTRIBUTES } from 'src/user/user.utils';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/login.dto';

interface LoginRequest {
  password: string;
  email: string;
  phone: string;
}

@Injectable()
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

    const user = await this.userService.get(undefined, where, [
      ...DEFAULT_USER_ATTRIBUTES,
      'passwordDigest',
    ]);

    if (!user) throw new NotFoundException(errorMessage);

    const isValidCredential = await compare(
      password,
      user.dataValues.passwordDigest,
    );
    if (!isValidCredential)
      throw new UnauthorizedException('Invalid credentials');

    const userResponse = plainToInstance(UserDto, user.dataValues);

    return {
      token: getToken(userResponse),
      user: userResponse,
    };
  }

  async signup(signupRequest: UserCreateDto) {
    console.log('---------------in');
    console.log(this.userService);

    return this.userService.create(signupRequest);
  }
}
