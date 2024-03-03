import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

import { v4 } from "uuid";

export default class OrderService {
  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (!orderItems.length || orderItems.length === 0) {
      throw new Error("Can't create an order without order items");
    }

    const order = new Order(v4(), customer.getId(), orderItems);

    customer.addRewardPoints(order.getTotalPrice() / 2);

    return order;
  }

  static getTotalPrice(orders: Order[]): number {
    return orders.reduce((totalValue, order) => {
      return totalValue + order.getTotalPrice();
    }, 0);
  }
}
