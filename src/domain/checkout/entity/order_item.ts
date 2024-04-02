import Product from "../../product/entity/product";

export default class OrderItem {
  private id: string;
  private price: number;
  private product: Product;
  private quantity: number;

  constructor(id: string, product: Product, quantity: number) {
    this.id = id;
    this.quantity = quantity;
    this.product = product;
    this.price = 0;

    this.calculatePrice();
    this.validate();
  }

  private validate() {
    if (this.id.length === 0) {
      throw new Error("Empty Id");
    }

    if (this.quantity <= 0 || !Number.isInteger(this.quantity)) {
      throw new Error("Invalid Quantity");
    }
  }

  public getId(): string {
    return this.id;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getProduct(): Readonly<Product> {
    return Object.freeze(this.product);
  }

  private calculatePrice() {
    this.price = this.product.getPrice() * this.quantity;
  }

  public getPrice(): number {
    return this.price;
  }
}
