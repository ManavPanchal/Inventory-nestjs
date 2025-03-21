import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { Material } from 'src/database/enitities/material.entity';
import { commonCreateDto } from 'src/common/dtos/common.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async getCategories(): Promise<Material[]> {
    return this.materialService.findAll();
  }

  @Get(':materialId')
  async getMaterial(
    @Param('materialId') materialId: string,
  ): Promise<Material | null> {
    return this.materialService.findOne(materialId);
  }

  @Post()
  async createMaterial(
    @Body() body: commonCreateDto,
  ): Promise<Material | null> {
    return await this.materialService.create(body);
  }
}
