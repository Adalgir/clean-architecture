export default class Address {
  _street: string;
  _city: string;
  _number: number = 0;
  _zip: string;

  constructor(street: string, city: string, number: number, zip: string) {
    this._street = street;
    this._city = city;
    this._number = number;
    this._zip = zip;
    this.validate();
  }

  get street(): string{
    return this._street;
  }

  get city(): string{ 
    return this._city;
  }

  get number(): number{
    return this._number;
  }

  get zip(): string{
    return this._zip;
  }

  changeStreet(street: string) {
    this._street = street;
    this.validate();
  }

  changeCity(city: string) {
    this._city = city;
    this.validate();
  }

  changeNumber(number: number) {
    this._number = number;
    this.validate();
  }

  changeZip(zip: string) {
    this._zip = zip;
    this.validate();
  }

  validate() {
    if (this._street === "") {
      throw new Error("Street is required");
    }
    if (this._city === "") {
      throw new Error("City is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zip === "") {
      throw new Error("Zip is required");
    }
  }
}
