import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface<Customer> {
  dateTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
