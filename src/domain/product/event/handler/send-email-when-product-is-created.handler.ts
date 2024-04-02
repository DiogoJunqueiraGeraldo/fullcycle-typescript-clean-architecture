import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Product from "../../entity/product";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<Product>
{
  handle(event: ProductCreatedEvent): void {
    console.log("Sending email...");
  }
}
