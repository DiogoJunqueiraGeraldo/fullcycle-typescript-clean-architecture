import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";

import { v4 } from "uuid";
export default class ProductFactory {
  public static create(
    productType: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (productType) {
      case "a":
        return new Product(v4(), name, price);
      case "b":
        return new ProductB(v4(), name, price);
      default:
        throw new Error("Unkown product type " + productType);
    }
  }
}
