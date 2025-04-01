import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { User } from 'src/database/enitities/user.entity';
import { UserCreateDto } from './user.dto';
import { USER_ROLE } from './user.utils';
import { hash } from 'src/auth/auth.util';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}

  get(userId?: string | number, where?: WhereOptions<User>) {
    return this.UserModel.findOne({
      where: { id: userId, ...where },
      attributes: ['name', 'email', 'phone', 'role'],
    });
  }

  async create(createInput: UserCreateDto) {
    const { address, email, name, password, phone } = createInput;

    const where: WhereOptions<User> = {};
    if (phone) where.phone = phone;
    else if (email) where.email = email;
    else where.name = name;

    const isUserExist = await this.get(undefined, where);

    if (isUserExist)
      throw new ConflictException(`User exist with same phone number ${phone}`);

    const createPayload = {
      address,
      email: email ?? '',
      name,
      phone,
      role: USER_ROLE.CUSTOMER,
      passwordDigest: '',
    };

    createPayload.passwordDigest = await hash(password);

    return await this.UserModel.create(createPayload);
  }
}
