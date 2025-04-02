import { Expose, Exclude } from 'class-transformer';
import { USER_ROLE } from 'src/user/user.utils';

export class UserDto {
  @Expose()
  id?: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  role: USER_ROLE;

  @Exclude()
  passwordDigest: string;
}
