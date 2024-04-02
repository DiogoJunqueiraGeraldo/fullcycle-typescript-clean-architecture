import { v4 } from "uuid";
import ProductFactory from "../../product/factory/product.factory";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Product from "../../product/entity/product";

export interface OrderPropsInterface {
  customerId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  static create(orderProps: OrderPropsInterface): Order {
    const orderItems = orderProps.items.map((item) => {
      const product = ProductFactory.create("a", item.name, item.price);
      return new OrderItem(v4(), product as Product, item.quantity);
    });

    return new Order(v4(), orderProps.customerId, orderItems);
  }
}
