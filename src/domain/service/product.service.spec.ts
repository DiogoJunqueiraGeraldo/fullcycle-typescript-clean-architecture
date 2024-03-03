import { Product } from "../entity/product";
import ProductService from "./product.service";

describe("ProductService operations", () => {
  it("should be able to change the price of all products", () => {
    const p1 = new Product("1", "Product 1", 10);
    const p2 = new Product("2", "Product 2", 20);

    ProductService.increasePrice([p1, p2], 100);

    expect(p1.getPrice()).toBe(20);
    expect(p2.getPrice()).toBe(40);
  });
});
