import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/database/enitities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [SequelizeModule],
})
export class AuthModule {}
