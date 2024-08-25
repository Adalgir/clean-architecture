import Entity from "../../@shared/entity/entity.abstract";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _activated: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  addAddress(address: Address) {
    this._address = address;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Adress is mandatory to activate the customer");
    }
    this._activated = true;
  }

  deactivate() {
    this._activated = false;
  }

  isActivated(): boolean {
    return this._activated;
  }

  set Address(address: Address) {
    this._address = address;
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }
}
