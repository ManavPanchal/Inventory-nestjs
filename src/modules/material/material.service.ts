import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { commonCreateDto } from 'src/common/dtos/common.dto';
import { Material } from 'src/database/enitities/material.entity';

@Injectable()
export class MaterialService {
  constructor(@InjectModel(Material) private materialModel: typeof Material) {}

  async findAll(): Promise<Material[]> {
    try {
      return await this.materialModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(
    materialId?: string | number,
    name?: string,
  ): Promise<Material | null> {
    try {
      return await this.materialModel.findOne({
        where: {
          ...(materialId
            ? { id: materialId }
            : { name: { [Op.like]: `%${name}%` } }),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(materialDetails: commonCreateDto): Promise<Material> {
    try {
      const name = materialDetails.name;
      const checkIfMaterialExists = await this.findOne(undefined, name);

      if (checkIfMaterialExists)
        throw new Error(`Material with same name: ${name} already exists`);

      return this.materialModel.create(materialDetails);
    } catch (error) {
      throw new Error(error);
    }
  }
}
