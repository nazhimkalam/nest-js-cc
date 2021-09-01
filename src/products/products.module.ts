/* eslint-disable prettier/prettier */
import { ProductService } from './products.service';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
