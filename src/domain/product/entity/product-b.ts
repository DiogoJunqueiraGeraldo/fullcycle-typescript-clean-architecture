import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private id: string;
  private name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;

    this.validate();
  }

  private validate(): void {
    if (this.id.length === 0) {
      throw new Error("Empty Id");
    }

    if (this.name.length === 0) {
      throw new Error("Empty Name");
    }

    if (this.price <= 0) {
      throw new Error("Invalid Price");
    }
  }

  getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public changeName(name: string): void {
    this.name = name;
    this.validate();
  }

  public changePrice(price: number): void {
    this.price = price;
    this.validate();
  }
  public getPrice(): number {
    return this.price * 2;
  }
}
