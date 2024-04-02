import CustomerFactory from "./customer.factory";

describe("Customer factory", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John");

    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("John");
    expect(customer.getAddress()).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const customer = CustomerFactory.createWithAddress(
      "John",
      "street",
      1,
      "zipcode",
      "city"
    );

    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("John");
    expect(customer.getAddress()).toBeDefined();
    expect(customer.getAddress().getStreet()).toBe("street");
    expect(customer.getAddress().getNumber()).toBe(1);
    expect(customer.getAddress().getZipcode()).toBe("zipcode");
    expect(customer.getAddress().getCity()).toBe("city");
  });
});
