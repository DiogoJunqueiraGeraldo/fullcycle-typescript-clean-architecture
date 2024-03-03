import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("street 1", 1, "zipcode 1", "city 1"));

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      active: false,
      rewardPoints: 0,
      street: "street 1",
      number: 1,
      zipcode: "zipcode 1",
      city: "city 1",
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("street 1", 1, "zipcode 1", "city 1"));

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: "street 1",
      number: 1,
      zipcode: "zipcode 1",
      city: "city 1",
      active: false,
      rewardPoints: 0,
    });

    customer.changeName("Customer 2");
    customer.changeAddress(new Address("street 2", 2, "zipcode 2", "city 2"));
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.update(customer);

    const newCustomerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(newCustomerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: "street 2",
      number: 2,
      zipcode: "zipcode 2",
      city: "city 2",
      active: true,
      rewardPoints: 10,
    });
  });

  it("should find a product", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("street 1", 1, "zipcode 1", "city 1"));

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    const foundCustomer = await customerRepository.findOne("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.getId(),
      name: foundCustomer.getName(),
      number: foundCustomer.getAddress().getNumber(),
      street: foundCustomer.getAddress().getStreet(),
      zipcode: foundCustomer.getAddress().getZipcode(),
      city: foundCustomer.getAddress().getCity(),
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.getRewardPoints(),
    });
  });

  it("should find all products", async () => {
    const customerRepository = new CustomerRepository();

    const c1 = new Customer("1", "Customer 1");
    c1.changeAddress(new Address("street 1", 1, "zipcode 1", "city 1"));

    const c2 = new Customer("2", "Customer 2");
    c2.changeAddress(new Address("street 2", 2, "zipcode 2", "city 2"));

    const c3 = new Customer("3", "Customer 3");
    c3.changeAddress(new Address("street 3", 3, "zipcode 3", "city 3"));

    await customerRepository.create(c1);
    await customerRepository.create(c2);
    await customerRepository.create(c3);

    const foundCustomers = await customerRepository.findAll(3, 1);
    const expectedCustomers = [c1, c2, c3];

    expect(foundCustomers.count).toBe(expectedCustomers.length);
    expect(foundCustomers.data.length).toBe(expectedCustomers.length);
    expect(foundCustomers.data).toEqual(expectedCustomers);
  });
});
