import EventInterface from "../../@shared/event/event.interface";
import Product from "../entity/product";

export default class ProductCreatedEvent implements EventInterface<Product> {
  dateTimeOccurred: Date;
  eventData: Product;

  constructor(eventData: Product) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
