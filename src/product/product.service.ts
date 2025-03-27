import { ConflictException, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/database/enitities/product.entity';
import { productAttributes } from './utils/constant';
import { createProductDto } from './dto/product.dto';
import { Op } from 'sequelize';

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

  async create(productDetails: createProductDto): Promise<Product | null> {
    try {
      const name = productDetails.name;
      const checkIfProductExists = await this.findOne(undefined, name);

      if (checkIfProductExists)
        throw new ConflictException(`product exist with name ${name}`);

      const {
        categoryId = 0,
        brandId,
        price = 0,
        buyingPrice,
        quantity,
        unit,
        subCategoryId = 0,
        materialId = 0,
        extraFields = '',
      } = productDetails;

      const newProduct = {
        name,
        category_id: categoryId,
        brand_id: brandId,
        price: price,
        buying_price: buyingPrice,
        stock_quantity: quantity,
        unit,
        sub_category_id: subCategoryId,
        material_id: materialId,
        extra_fields: extraFields,
      };

      return this.productModel.create(newProduct);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
