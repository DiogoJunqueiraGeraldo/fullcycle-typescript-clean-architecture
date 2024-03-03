import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import { Product } from "../../domain/entity/product";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { FindAllResult } from "../../domain/repository/repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      street: entity.getAddress().getStreet(),
      number: entity.getAddress().getNumber(),
      zipcode: entity.getAddress().getZipcode(),
      city: entity.getAddress().getCity(),
      active: entity.isActive(),
      rewardPoints: entity.getRewardPoints(),
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.getName(),
        street: entity.getAddress().getStreet(),
        number: entity.getAddress().getNumber(),
        zipcode: entity.getAddress().getZipcode(),
        city: entity.getAddress().getCity(),
        active: entity.isActive(),
        rewardPoints: entity.getRewardPoints(),
      },
      {
        where: { id: entity.getId() },
      }
    );
  }
  async findOne(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    return new Customer(
      customerModel.id,
      customerModel.name,
      customerModel.active,
      customerModel.rewardPoints,
      new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      )
    );
  }

  async findAll(
    pageSize: number,
    page: number
  ): Promise<FindAllResult<Customer>> {
    const customerModels = await CustomerModel.findAll({
      offset: pageSize * (page - 1),
    });

    return {
      count: customerModels.length,
      data: customerModels.map(
        (customerModel) =>
          new Customer(
            customerModel.id,
            customerModel.name,
            customerModel.active,
            customerModel.rewardPoints,
            new Address(
              customerModel.street,
              customerModel.number,
              customerModel.zipcode,
              customerModel.city
            )
          )
      ),
    };
  }
}
