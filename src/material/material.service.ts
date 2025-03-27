import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { commonCreateDto } from 'src/common/dtos/common.dto';
import { Material } from 'src/database/enitities/material.entity';

@Injectable()
export class MaterialService {
  constructor(@InjectModel(Material) private materialModel: typeof Material) {}

  async findAll(where = {}): Promise<Material[]> {
    try {
      return await this.materialModel.findAll({ where });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(
    materialId?: string | number,
    where?: Record<string, any>,
  ): Promise<Material | null> {
    try {
      return await this.materialModel.findOne({
        where: {
          ...(materialId ? { id: materialId } : {}),
          ...where,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(materialDetails: commonCreateDto): Promise<Material> {
    const name = materialDetails.name;
    const checkIfMaterialExists = await this.findOne(undefined, {
      name: { [Op.like]: `%${name}%` },
    });

    if (checkIfMaterialExists)
      throw new ConflictException(`material exist with name ${name}`);

    return this.materialModel.create(materialDetails);
  }
}
