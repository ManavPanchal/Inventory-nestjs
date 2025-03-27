import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { Material } from 'src/database/enitities/material.entity';
import { commonCreateDto } from 'src/common/dtos/common.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getCategories(@Param() params: any): Promise<Material[]> {
    // const {}  = params/

    return this.materialService.findAll();
  }

  @Get(':materialId')
  async getMaterial(
    @Param('materialId', ParseIntPipe) materialId: string,
    // @Query() query: any,
  ): Promise<Material | null> {
    // const wherePayload: Record<string, any> = {};
    // if (query.name) {
    //   wherePayload.name = query.name;
    // }
    return this.materialService.findOne(materialId);
  }

  @Post()
  async createMaterial(
    @Body() body: commonCreateDto,
  ): Promise<Material | null> {
    return await this.materialService.create(body);
  }
}
