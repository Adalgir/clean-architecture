import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrow("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "Doe");

    //Act
    customer.changeName("John");

    //Assert
    expect(customer.name).toBe("John");
  });

  it("should activate customer", () => {
    const costumer = new Customer("1", "Doe");
    const addres = new Address("Main St", "Springfield", 10, "12345");
    costumer.addAddress(addres);

    costumer.activate();

    expect(costumer.isActivated()).toBe(true);
  });

  it("should deactivate customer", () => {
    const costumer = new Customer("1", "Doe");
    costumer.deactivate();

    expect(costumer.isActivated()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const costumer = new Customer("1", "Doe");
      costumer.activate();
    }).toThrow("Adress is mandatory to activate the customer");
  });

  it("should add reward points", () => {
    const costumer = new Customer("1", "Doe");
    expect(costumer.rewardPoints).toBe(0);

    costumer.addRewardPoints(10);
    expect(costumer.rewardPoints).toBe(10);

    costumer.addRewardPoints(10);
    expect(costumer.rewardPoints).toBe(20);
  });
});
