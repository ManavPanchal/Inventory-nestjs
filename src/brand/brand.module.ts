import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from 'src/database/enitities/brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [SequelizeModule],
})
export class BrandModule {}
