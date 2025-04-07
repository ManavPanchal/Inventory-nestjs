import { ConflictException, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/database/enitities/product.entity';
import { productAttributes } from './utils/constant';
import { createProductDto, ProductDto } from './dto/product.dto';
import { Op } from 'sequelize';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  productService: any;
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  findAll(): Promise<Product[]> {
    try {
      return this.productModel.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(productId?: string | number, name?: string): Promise<Product | null> {
    try {
      return this.productModel.findOne({
        where: {
          ...(productId
            ? { id: productId }
            : { name: { [Op.like]: `%${name}%` } }),
        },
        attributes: productAttributes,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(productDetails: createProductDto): Promise<ProductDto | null> {
    try {
      const name = productDetails.name;
      const checkIfProductExists = await this.findOne(undefined, name);

      if (checkIfProductExists)
        throw new ConflictException(`product exist with name ${name}`);

      const {
        categoryId,
        brandId,
        sellingPrice,
        buyingPrice,
        quantity,
        unit,
        subCategoryId,
        materialId,
        extraFields = '',
      } = productDetails;

      const product = await this.productModel.create({
        categoryId,
        name,
        sellingPrice,
        quantity,
        unit,
        brandId,
        buyingPrice,
        extraFields,
        materialId,
        subCategoryId,
      });

      return plainToInstance(ProductDto, product.dataValues);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
