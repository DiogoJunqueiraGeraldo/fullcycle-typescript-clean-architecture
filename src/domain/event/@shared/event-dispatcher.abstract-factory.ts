import Customer from "../../entity/customer";
import { Product } from "../../entity/product";
import SendConsolelog1Handler from "../customer/handler/send-console-log-1.handler";
import SendConsolelog2Handler from "../customer/handler/send-console-log-2.handler";
import SendConsoleLogWhenCustomerAddressChangesHandler from "../customer/handler/send-console-log-when-customer-address-changes.handler";
import EventDispatcher from "./event-dispatcher";
import EventDispatcherInterface from "./event-dispatcher.interface";

export default class EventDispatcherAbstractFactory {
  public static createEventDispatcher(
    domain: string
  ): EventDispatcherInterface<any> {
    switch (domain) {
      case "Customer":
        return EventDispatcherAbstractFactory.createCustomerEventDispatcher();
      case "Product":
        return new EventDispatcher<Product>();
      default:
        return new EventDispatcher<any>();
    }
  }

  private static createCustomerEventDispatcher(): EventDispatcher<Customer> {
    const sendConsoleLog1Handler = new SendConsolelog1Handler();
    const sendConsoleLog2Handler = new SendConsolelog2Handler();
    const sendConsoleLogwhenCustomerAddressChangesHandler =
      new SendConsoleLogWhenCustomerAddressChangesHandler();

    const eventDispatcher = new EventDispatcher<Customer>();

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler);

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      sendConsoleLogwhenCustomerAddressChangesHandler
    );

    return eventDispatcher;
  }
}
