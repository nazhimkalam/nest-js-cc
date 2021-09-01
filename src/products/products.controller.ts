import { HttpStatus } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Product } from './product.model';
import { ProductService } from './products.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { productId: string } {
    const response = this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { productId: response };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getSingleProduct(@Param('id') id: string): Product {
    return this.productService.getSingleProduct(id);
  }

  @Patch('/:id')
  updateSingleProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Product {
    return this.productService.updateSingleProduct(
      id,
      title,
      description,
      price,
    );
  }

  @Delete('/:id')
  deleteSingleProduct(@Param('id') id: string): { status: HttpStatus } {
    return this.productService.deleteSingleProduct(id);
  }
}
