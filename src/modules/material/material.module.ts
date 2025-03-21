import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material } from 'src/database/enitities/material.entity';

@Module({
  imports: [SequelizeModule.forFeature([Material])],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [SequelizeModule],
})
export class MaterialModule {}
