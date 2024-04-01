import { Product } from "../../entity/product";
import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface<Product> {
  dateTimeOccurred: Date;
  eventData: Product;

  constructor(eventData: Product) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}