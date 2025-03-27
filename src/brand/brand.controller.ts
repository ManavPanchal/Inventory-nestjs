import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from 'src/database/enitities/brand.entity';
import { commonCreateDto } from 'src/common/dtos/common.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getCategories(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  @Get(':brandId')
  async getBrand(
    @Param('brandId', ParseIntPipe) brandId: string,
  ): Promise<Brand | null> {
    return this.brandService.findOne(brandId);
  }

  @Post()
  async createBrand(@Body() body: commonCreateDto): Promise<Brand | null> {
    return await this.brandService.create(body);
  }
}
