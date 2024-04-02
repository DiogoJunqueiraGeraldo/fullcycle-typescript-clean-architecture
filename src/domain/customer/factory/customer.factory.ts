import { v4 } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {
  static createWithAddress(
    name: string,
    street: string,
    number: number,
    zipcode: string,
    city: string
  ) {
    return new Customer(
      v4(),
      name,
      false,
      0,
      new Address(street, number, zipcode, city)
    );
  }
  public static create(name: string): Customer {
    return new Customer(v4(), name);
  }
}
