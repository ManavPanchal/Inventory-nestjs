import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { commonCreateDto } from 'src/common/dtos/common.dto';
import { Brand } from 'src/database/enitities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async findAll(): Promise<Brand[]> {
    try {
      return await this.brandModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(
    brandId?: string | number,
    name?: string,
  ): Promise<Brand | null> {
    try {
      return await this.brandModel.findOne({
        where: {
          ...(brandId ? { id: brandId } : { name: { [Op.like]: `%${name}%` } }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(brandDetails: commonCreateDto): Promise<Brand> {
    try {
      const name = brandDetails.name;
      const checkIfBrandExists = await this.findOne(undefined, name);

      if (checkIfBrandExists)
        throw new Error(`Brand with same name: ${name} already exists`);

      return this.brandModel.create(brandDetails);
    } catch (error) {
      throw new Error(error);
    }
  }
}
