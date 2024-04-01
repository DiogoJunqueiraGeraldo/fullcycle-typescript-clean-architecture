import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsolelog2Handler
  implements EventHandlerInterface<Customer>
{
  handle(_: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
