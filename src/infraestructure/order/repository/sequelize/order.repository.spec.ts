import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";
import Product from "../../../../domain/product/entity/product";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Order repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be able to find a order", async () => {
    const customer = await createFakeCustomer();
    const product = await createFakeProduct();

    const orderItem = new OrderItem("1", product, 1);
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.getId(), [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ["orderItems"],
    });

    const foundOrder = await orderRepository.findOne(order.getId());

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.getId(),
      customerId: foundOrder.getCustomerId(),
      totalPrice: foundOrder.getTotalPrice(),
      orderItems: foundOrder.getItems().map((orderItem: OrderItem) => {
        return {
          id: orderItem.getId(),
          orderId: foundOrder.getId(),
          productId: orderItem.getProduct().getId(),
          quantity: orderItem.getQuantity(),
          price: orderItem.getPrice(),
        };
      }),
    });
  });

  it("should be able to find all orders", async () => {
    const customer = await createFakeCustomer();
    const product = await createFakeProduct();

    const orderRepository = new OrderRepository();

    const orderItem1 = new OrderItem("1", product, 1);
    const order1 = new Order("1", customer.getId(), [orderItem1]);

    const orderItem2 = new OrderItem("2", product, 1);
    const order2 = new Order("2", customer.getId(), [orderItem2]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orderModels = await OrderModel.findAll({
      include: [
        {
          model: OrderItemModel,
          include: [ProductModel],
        },
      ],
    });

    const foundOrders = await orderRepository.findAll(2, 1);

    expect(foundOrders.count).toBe(orderModels.length);
    expect(foundOrders.data.length).toBe(orderModels.length);
    expect(foundOrders.data).toEqual(
      orderModels.map(
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
      )
    );
  });

  it("should be able to update an order", async () => {
    const customer = await createFakeCustomer();
    const product = await createFakeProduct();

    const orderItem = new OrderItem("1", product, 1);
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.getId(), [orderItem]);
    await orderRepository.create(order);

    const newOrderItem = new OrderItem("2", product, 2);

    order.addItem(newOrderItem);
    await orderRepository.update(order);

    const foundOrder = await orderRepository.findOne(order.getId());

    expect(order).toStrictEqual(foundOrder);
  });

  it("should create a new order", async () => {
    const customer = await createFakeCustomer();
    const product = await createFakeProduct();

    const orderItem = new OrderItem("1", product, 1);
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.getId(), [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ["orderItems"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.getId(),
      customerId: order.getCustomerId(),
      totalPrice: order.getTotalPrice(),
      orderItems: order.getItems().map((orderItem: OrderItem) => {
        return {
          id: orderItem.getId(),
          orderId: order.getId(),
          productId: orderItem.getProduct().getId(),
          quantity: orderItem.getQuantity(),
          price: orderItem.getPrice(),
        };
      }),
    });
  });
});

async function createFakeProduct(): Promise<Product> {
  const productRepository = new ProductRepository();
  const product = new Product("1", "Product 1", 1);
  await productRepository.create(product);
  return product;
}

async function createFakeCustomer(): Promise<Customer> {
  const customerRepository = new CustomerRepository();

  const customer = new Customer("1", "Customer 1");

  const address = new Address("street 1", 1, "zipcode 1", "city 1");
  customer.changeAddress(address);
  customer.activate();

  await customerRepository.create(customer);

  return customer;
}
