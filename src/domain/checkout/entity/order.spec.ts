import Order from "./order";
import OrderItem from "./order_item";
import Product from "../../product/entity/product";

describe("Order error handling", () => {
  it("should thrown an error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Empty Id");
  });

  it("should thrown an error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow("Empty CustomerId");
  });

  it("should thrown an error when customerId is empty", () => {
    expect(() => {
      new Order("123", "321", []);
    }).toThrow("Empty Items List");
  });
});

describe("Order operations", () => {
  it("should automatically calculate total price", () => {
    const product = new Product("1", "Product Name", 10);
    const item1 = new OrderItem("1", product, 1);
    const item2 = new OrderItem("2", product, 2);
    const order = new Order("123", "321", [item1, item2]);

    expect(order.getTotalPrice()).toBe(item1.getPrice() + item2.getPrice());
  });

  it("should automatically recalculate total price when a item is added", () => {
    const product = new Product("1", "Product Name", 10);
    const item1 = new OrderItem("1", product, 1);
    const item2 = new OrderItem("2", product, 2);

    const order = new Order("123", "321", [item1]);
    order.addItem(item2);

    expect(order.getTotalPrice()).toBe(item1.getPrice() + item2.getPrice());
  });
});
