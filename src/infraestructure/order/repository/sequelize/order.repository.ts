import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import { FindAllResult } from "../../../../domain/@shared/repository/repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await Promise.all(
      entity.getItems().map(async (orderItem) => {
        OrderItemModel.upsert({
          id: orderItem.getId(),
          productId: orderItem.getProduct().getId(),
          orderId: entity.getId(),
          quantity: orderItem.getQuantity(),
          price: orderItem.getPrice(),
        });
      })
    );

    await OrderModel.update(
      {
        id: entity.getId(),
        customerId: entity.getCustomerId(),
        totalPrice: entity.getTotalPrice(),
      },
      {
        where: { id: entity.getId() },
      }
    );
  }

  async findOne(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [
        {
          model: OrderItemModel,
          include: [ProductModel],
        },
      ],
    });

    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.orderItems.map(
        (orderItem) =>
          new OrderItem(
            orderItem.id,
            new Product(
              orderItem.product.id,
              orderItem.product.name,
              orderItem.product.price
            ),
            orderItem.quantity
          )
      )
    );
  }

  async findAll(pageSize: number, page: number): Promise<FindAllResult<Order>> {
    const orderModels = await OrderModel.findAll({
      offset: pageSize * (page - 1),
      include: [
        {
          model: OrderItemModel,
          include: [ProductModel],
        },
      ],
    });

    // maybe consider building some mappers
    return {
      count: orderModels.length,
      data: orderModels.map(
        (orderModel) =>
          new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.orderItems.map(
              (orderItem) =>
                new OrderItem(
                  orderItem.id,
                  new Product(
                    orderItem.product.id,
                    orderItem.product.name,
                    orderItem.product.price
                  ),
                  orderItem.quantity
                )
            )
          )
      ),
    };
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.getId(),
        customerId: entity.getCustomerId(),
        totalPrice: entity.getTotalPrice(),
        orderItems: entity.getItems().map(
          (item) =>
            ({
              id: item.getId(),
              price: item.getPrice(),
              quantity: item.getQuantity(),
              orderId: item.getId(),
              productId: item.getProduct().getId(),
            } as OrderItemModel)
        ),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
