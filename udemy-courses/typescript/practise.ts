// // //unions
// // let stuff: string | number | object
// // stuff='mary';

// // //tuple
// // const stuff2 :number[]=[2, 4]
// // const stuff3 :[number,number]=[2, 4]

// // //empty obj type: for anything except null or undefined
// // //record: set objs which are unknow nat timeof setting

// // //enum
// // enum Something{

// // }

// //decorators
// function logger<T extends new (...args: any[]) => any>(
//   target: T,
//   cxt: ClassDecoratorContext
// ) {
//   console.log(target);
//   console.log(cxt);
//   return class extends target {
//     constructor(...args: any[]) {
//       super(...args);
//       console.log(this.name);
//     }
//   };
// }

// function replacer(name: string) {
//   return function autobind(
//     target: (...args: any[]) => any,
//     cxt: ClassMethodDecoratorContext
//   ) {
//     console.log(target);
//     console.log(cxt);
//     cxt.addInitializer(function (this: any) {
//       this[cxt.name] = this[cxt.name].bind(this);
//     });

//     return function (this: any) {
//       console.log("called greet fn with name:", name);
//       target.apply(this);
//     };
//   };
// }

// @logger
// class Person {
//   name = "Max";

//   @replacer("mell")
//   greet() {
//     console.log(`Hi, I am ${this.name}`);
//   }
// }

// const person = new Person();
// person.greet();
// console.log(person);

// function logger(args: any) {
//   console.log("logger args called", args);
//   return (target: any) => {
//     console.log(target);
//   };
// }

// @logger("logger args")
// class Person {
//   name = "s";

//   greet() {
//     console.log("hi", this.name);
//   }
// }

// const renderer = (htmlContent: string, elementId: string) => {
//   return (target: any) => {
//     document.createElement("h1").innerHTML = htmlContent;
//   };
// };

// function log(target: any, propertyName: string) {
//   console.log('Property decorator executed');
//   console.log(target);  // Prototype of the object
//   console.log(propertyName);  // Name of the property
// }

// class Product {
//   @log
//   title: string='default';
// }

// function log2(
//   target: any,
//   propertyName: string,
//   descriptor: PropertyDescriptor
// ) {
//   console.log("Accessor decorator executed");
//   console.log(target); // Prototype or constructor
//   console.log(propertyName); // Accessor name
//   console.log(descriptor); // Property descriptor
// }

// class Product {
//   private _price: number = 1;
//   set price(value: number) {
//     if (value > 0) {
//       this._price = value;
//     }
//   }
//   @log2
//   get price() {
//     return this._price;
//   }
// }

// function log3(target: any, methodName: string, descriptor: PropertyDescriptor) {
//   console.log("Method decorator executed");
//   console.log(target); // Prototype or constructor
//   console.log(methodName); // Method name
//   console.log(descriptor); // Property descriptor
// }

// class Product {
//   @log3
//   getPriceWithTax(tax: number) {
//     return this._price * (1 + tax);
//   }
// }

// function WithTemplate(template: string) {
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     return class extends originalConstructor {
//       age = 9;
//       constructor(...args: any[]) {
//         super(...args);
//         console.log(`Rendering template: ${template} for ${this.name}`);
//         console.log(this)
//       }
//     };
//   };
// }

// @WithTemplate("Hello")
// class Person {
//   name = "Max";
// }

// const p = new Person();

// function Log3(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   // Modify the descriptor to change behavior
//   descriptor.enumerable = true;
//   console.log(descriptor)
//   return descriptor;
// }

// class Product {
//   private _price: number = 0;

//   @Log3
//   set price(value: number) {
//     this._price = value;
//   }
// }

// const product = new Product()
// console.log(product)



// const validators: Record<string, Record<string, string[]>> = {};

// function Required(target: any, propName: string) {
//   addValidator(target, propName, "required");
// }

// function PositiveNumber(target: any, propName: string) {
//   addValidator(target, propName, "positive");
// }

// function addValidator(target: any, propName: string, validatorType: string) {
//   const className = target.constructor.name;
//   if (!validators[className]) {
//     validators[className] = {};
//   }
//   if (!validators[className][propName]) {
//     validators[className][propName] = [];
//   }
//   validators[className][propName].push(validatorType);
// }

// class Course {
//   @Required
//   title: string;

//   @PositiveNumber
//   price: number;

//   constructor(t: string, p: number) {
//     this.title = t;
//     this.price = p;
//   }
// }


// console.log(validators)

import 'reflect-metadata';
import { Product } from './product.model';
import { plainToClass } from 'class-transformer';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
];

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}