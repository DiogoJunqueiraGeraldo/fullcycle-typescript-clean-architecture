export default class Address {
  private street: string;
  private number: number;
  private zipcode: string;
  private city: string;

  constructor(street: string, number: number, zipcode: string, city: string) {
    this.street = street;
    this.number = number;
    this.zipcode = zipcode;
    this.city = city;

    this.validate();
  }

  private validate() {
    if (this.street.length === 0) {
      throw new Error("Empty Street");
    } else if (this.number === 0) {
      throw new Error("Invalid Number");
    } else if (this.zipcode.length === 0) {
      throw new Error("Invalid Zip Code");
    } else if (this.city.length === 0) {
      throw new Error("Invalid City");
    }
  }

  public getStreet(): string {
    return this.street;
  }

  public getNumber(): number {
    return this.number;
  }

  public getZipcode(): string {
    return this.zipcode;
  }

  public getCity(): string {
    return this.city;
  }
}
