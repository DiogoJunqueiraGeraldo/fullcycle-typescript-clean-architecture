import Customer from "../../../entity/customer";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogWhenCustomerAddressChangesHandler
  implements EventHandlerInterface<Customer>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.getId()}, ${event.eventData.getName()} alterado para: ${[
        event.eventData.getAddress().getCity(),
        event.eventData.getAddress().getZipcode(),
        event.eventData.getAddress().getStreet(),
        event.eventData.getAddress().getNumber(),
      ].join(" ")}`
    );
  }
}
