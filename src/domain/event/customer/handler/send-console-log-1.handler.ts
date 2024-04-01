import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsolelog1Handler
  implements EventHandlerInterface<Customer>
{
  handle(_: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
