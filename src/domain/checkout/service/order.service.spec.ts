import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Product from "../../product/entity/product";
import OrderService from "./order.service";

describe("OrderService error handling", () => {
  it("should not be able to create a order without order items", () => {
    expect(() => {
      const c1 = new Customer("1", "Customer 1");
      OrderService.placeOrder(c1, []);
    }).toThrow("Can't create an order without order items");
  });
});

describe("OrderService operations", () => {
  it("should place an order", () => {
    const p1 = new Product("1", "Product 1", 100);
    const c1 = new Customer("1", "Customer 1");
    const oi1 = new OrderItem("1", p1, 1);

    const order: Order = OrderService.placeOrder(c1, [oi1]);

    expect(c1.getRewardPoints()).toBe(50);
    expect(order.getTotalPrice()).toBe(100);
  });

  it("should be able to calculate many orders price", () => {
    const p1 = new Product("1", "Product 1", 100);
    const p2 = new Product("2", "Product 2", 200);

    const oi1 = new OrderItem("1", p1, 1);
    const oi2 = new OrderItem("2", p2, 2);

    const o1 = new Order("1", "1", [oi1, oi2]);
    const o2 = new Order("2", "1", [oi1, oi2]);

    const totalPrice = OrderService.getTotalPrice([o1, o2]);

    expect(totalPrice).toBe(1000);
  });
});
