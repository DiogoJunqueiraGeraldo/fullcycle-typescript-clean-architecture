import { Product } from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], increaseRate: number): void {
    products.forEach((product) => {
      const finalValueRate = 1 + increaseRate / 100;
      const newPrice = product.getPrice() * finalValueRate;
      product.changePrice(newPrice);
    });
  }
}
