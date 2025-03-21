import { Injectable } from '@nestjs/common';
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
        throw new Error(`product existc with name ${name}`);

      const {
        categoryId,
        brandId,
        price,
        buyingPrice,
        quantity,
        unit,
        subCategoryId,
        materialId,
        extraFields,
      } = productDetails;

      const newProduct = {
        name,
        category_id: categoryId || 0,
        brand_id: brandId,
        price: price || 0,
        buying_price: buyingPrice,
        stock_quantity: quantity,
        unit,
        sub_category_id: subCategoryId || 0,
        material_id: materialId || 0,
        extra_fields: extraFields ?? '',
      };

      return this.productModel.create(newProduct);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
