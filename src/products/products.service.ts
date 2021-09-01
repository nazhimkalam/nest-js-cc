/* eslint-disable prettier/prettier */
import { Product } from './product.model';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const id = v4();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getSingleProduct(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new NotFoundException('Could not find product.');
    return product;
  }

  updateSingleProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index].title = title;
    this.products[index].description = description;
    this.products[index].price = price;

    return this.products[index];
  }

  deleteSingleProduct(id: string): { status: HttpStatus } {
    const index = this.products.findIndex((product) => product.id === id);
    console.log(index);
    if (index < 0) throw new NotFoundException('Could not find product.');
    this.products.splice(index, 1);
    return {
      status: HttpStatus.OK,
    };
  }
}
