import { Product } from "./product";

describe("Product error handling", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("Empty Id");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow("Empty Name");
  });

  it("should throw error when name is changed to empty", () => {
    expect(() => {
      const product = new Product("123", "Name", 10);
      product.changeName("");
    }).toThrow("Empty Name");
  });

  it("should throw error when price is negative", () => {
    expect(() => {
      new Product("123", "Name", 0);
    }).toThrow("Invalid Price");
  });

  it("should throw error when price is changed to negative", () => {
    expect(() => {
      const product = new Product("123", "Name", 10);
      product.changePrice(-1);
    }).toThrow("Invalid Price");
  });
});

describe("Product operations", () => {
  it("should be able to change name", () => {
    const product = new Product("123", "Name 1", 10);

    product.changeName("Name 2");

    expect(product.getName()).toBe("Name 2");
  });

  it("should be able to change price", () => {
    const product = new Product("123", "Name 1", 10);

    product.changePrice(20);

    expect(product.getPrice()).toBe(20);
  });
});
