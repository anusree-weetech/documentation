import 'reflect-metadata';
import { Product } from './product.model';
import { plainToClass, plainToInstance } from 'class-transformer';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
];

const loadedProducts = plainToInstance(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}