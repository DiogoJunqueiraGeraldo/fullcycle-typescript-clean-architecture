import OrderItem from "./order_item";

export default class Order {
  private id: string;
  private customerId: string;
  private items: OrderItem[];
  private totalPrice: number;

  public constructor(id: string, customerId: string, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.totalPrice = this.calculateTotalPrice();

    this.validate();
  }

  private validate() {
    if (this.id.length === 0) {
      throw new Error("Empty Id");
    }

    if (this.customerId.length === 0) {
      throw new Error("Empty CustomerId");
    }

    if (this.items.length === 0) {
      throw new Error("Empty Items List");
    }
  }

  private calculateTotalPrice(): number {
    return this.items.reduce((a, i) => a + i.getPrice(), 0);
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getId(): string {
    return this.id;
  }

  public getTotalPrice() {
    return this.totalPrice;
  }

  public getItems(): OrderItem[] {
    return [...this.items];
  }

  public addItem(orderItem: OrderItem) {
    this.items.push(orderItem);
    this.totalPrice += orderItem.getPrice();
  }
}
