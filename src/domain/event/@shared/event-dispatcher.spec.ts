import Address from "../../entity/address";
import Customer from "../../entity/customer";
import { Product } from "../../entity/product";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";
import EventDispatcherSingleton from "./event-dispatcher.singleton";

describe("Domain event dispatcher tests", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher<Product>();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher<Product>();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher<Product>();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(
      0
    );
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher<Product>();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const newProduct = new Product("1", "product", 1.2);
    const productCreatedEvent = new ProductCreatedEvent(newProduct);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });

  it("should notify all event handlers when customer created", () => {
    const customerCreatedHandlersSpys =
      EventDispatcherSingleton.getEventDispatcher("Customer")
        .getEventHandlers("CustomerCreatedEvent")
        .map((handler) => jest.spyOn(handler, "handle"));

    const customer = new Customer(
      "1",
      "Customer 1",
      true,
      0,
      new Address("street", 1, "123", "city")
    );

    customerCreatedHandlersSpys.forEach((spy) => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    const changeAddressSpy = jest.spyOn(
      EventDispatcherSingleton.getEventDispatcher("Customer").getEventHandlers(
        "CustomerAddressChangedEvent"
      )[0],
      "handle"
    );
    customer.changeAddress(new Address("street 2", 2, "321", "city 2"));
    expect(changeAddressSpy).toHaveBeenCalledTimes(1);
  });
});
