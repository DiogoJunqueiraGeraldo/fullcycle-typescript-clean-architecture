import EventDispatcherSingleton from "../../@shared/event/event-dispatcher.singleton";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";

export default class Customer {
  private id: string;
  private name: string;
  private address!: Address;
  private active: boolean;
  private rewardPoints: number;

  public constructor(
    id: string,
    name: string,
    active: boolean = false,
    rewardPoints: number = 0,
    address?: Address
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.rewardPoints = rewardPoints;
    this.address = address;

    this.validate();

    EventDispatcherSingleton.getEventDispatcher("Customer").notify(
      new CustomerCreatedEvent(this)
    );
  }

  private validate(): void {
    if (this.name.length === 0) {
      throw new Error("Empty Name");
    }

    if (this.id.length === 0) {
      throw new Error("Empty Id");
    }
  }

  public activate(): void {
    if (!this.address) {
      throw new Error("Can't activate customer without address");
    }

    this.active = true;
  }

  public addRewardPoints(points: number) {
    if (points < 0) {
      throw new Error("Can't add a nonpositive amount of points");
    }
    this.rewardPoints += points;
  }

  public changeName(name: string) {
    this.name = name;
    this.validate();
  }

  public changeAddress(address: Address) {
    this.address = address;

    EventDispatcherSingleton.getEventDispatcher("Customer").notify(
      new CustomerAddressChangedEvent(this)
    );
  }

  public getAddress(): Readonly<Address> {
    return Object.freeze(this.address);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getRewardPoints(): number {
    return this.rewardPoints;
  }
}
