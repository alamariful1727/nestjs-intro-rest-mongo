import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(createProductDto: CreateProductDto) {
    const { title, description, price } = createProductDto;
    const newProduct = new this.productModel({ title, description, price });
    return await newProduct.save();
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(prodId: string) {
    let product: Product;
    try {
      product = await this.productModel
        .findById(prodId)
        .select('_id title description price')
        .exec();
    } catch (error) {
      throw new NotFoundException('Invalid Mongoose ID.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(prodId: string, updateProductDto: UpdateProductDto) {
    let updatedProduct: Product;
    try {
      updatedProduct = await this.productModel
        .findByIdAndUpdate({ _id: prodId }, updateProductDto)
        .exec();
    } catch (error) {
      throw new NotFoundException('Invalid Mongoose ID.');
    }
    if (!updatedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    return {
      id: prodId,
      message: 'Product updated',
    };
  }

  async deleteProduct(prodId: string) {
    let deletedProduct: Product;
    try {
      deletedProduct = await this.productModel
        .findByIdAndRemove({ _id: prodId })
        .exec();
    } catch (error) {
      throw new NotFoundException('Invalid Mongoose ID.');
    }
    if (!deletedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    return {
      id: prodId,
      message: 'Product deleted',
    };
  }
}
