import Product from "../../product/entity/product";
import OrderItem from "./order_item";

describe("OrderItem error handling", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new OrderItem("", createFakeProduct(), 0);
    }).toThrow("Empty Id");
  });

  it("should throw error when quantity is not positive", () => {
    expect(() => {
      new OrderItem("1", createFakeProduct(), 0);
    }).toThrow("Invalid Quantity");

    expect(() => {
      new OrderItem("1", createFakeProduct(), 1.5);
    }).toThrow("Invalid Quantity");
  });
});

describe("OrderItem operations", () => {
  it("should be abre to retrieve its price", () => {
    const product = createFakeProduct();
    const quantity = getRandomNumberBesidesZero(100, true);
    const ordemItem = new OrderItem("1", product, quantity);
    expect(ordemItem.getPrice()).toBe(product.getPrice() * quantity);
  });
});

function createFakeProduct() {
  return new Product("1", "Product 1", getRandomNumberBesidesZero(100, false));
}

function getRandomNumberBesidesZero(
  max: number,
  forceInteger: boolean
): number {
  let number = Math.random() * max;

  if (forceInteger) {
    number = Math.floor(number);
  }

  return number !== 0 ? number : getRandomNumberBesidesZero(max, forceInteger);
}
