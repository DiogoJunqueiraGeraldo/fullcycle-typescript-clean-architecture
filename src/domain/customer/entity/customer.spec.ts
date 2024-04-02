import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer error handling", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Empty Id");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Empty Name");
  });

  it("should throw error when name is empty after calling changeName", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.changeName("");
    }).toThrow("Empty Name");
  });

  it("should throw error when trying to activate customer without address", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate();
    }).toThrow("Can't activate customer without address");
  });

  it("should throw error when trying to add a negative reward point", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.addRewardPoints(-10);
    }).toThrow("Can't add a nonpositive amount of points");
  });
});

describe("Customer operations", () => {
  it("should be able to change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Maria");
    expect(customer.getName()).toBe("Maria");
  });

  it("should be able to activate customer with address", () => {
    const address = new Address("Street 1", 1, "123", "NY");
    const customer = new Customer("123", "John");

    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should start with zero rewards points", () => {
    const customer = new Customer("123", "John");
    expect(customer.getRewardPoints()).toBe(0);
  });

  it("should be able to increase reward points", () => {
    const customer = new Customer("123", "John");
    const initialRewardPoints = customer.getRewardPoints();

    expect(customer.getRewardPoints()).toBe(initialRewardPoints);

    customer.addRewardPoints(10);

    expect(customer.getRewardPoints()).toBe(initialRewardPoints + 10);

    customer.addRewardPoints(10);

    expect(customer.getRewardPoints()).toBe(initialRewardPoints + 10 + 10);
  });
});
