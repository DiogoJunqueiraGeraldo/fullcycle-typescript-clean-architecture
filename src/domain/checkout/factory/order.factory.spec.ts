import { v4 } from "uuid";
import Order from "../entity/order";
import ProductFactory from "../../product/factory/product.factory";
import OrderFactory from "./order.factory";

describe("Order factory", () => {
  it("should be able to create a order", () => {
    const orderProps = {
      customerId: v4(),
      items: [
        {
          name: "Product 1",
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order: Order = OrderFactory.create(orderProps);

    expect(order.getId()).toBeDefined();
    expect(order.getCustomerId()).toBe(orderProps.customerId);
    expect(order.getTotalPrice()).toBe(
      orderProps.items.reduce(
        (acc, { quantity, price }) => acc + quantity * price,
        0
      )
    );
    expect(order.getItems().length).toBe(orderProps.items.length);
    orderProps.items.forEach((item) => {
      expect(
        order
          .getItems()
          .some(
            (orderItem) =>
              orderItem.getProduct().getName() === item.name &&
              orderItem.getProduct().getPrice() === item.price &&
              orderItem.getQuantity() == item.quantity &&
              orderItem.getPrice() == item.price
          )
      );
    });
  });
});
