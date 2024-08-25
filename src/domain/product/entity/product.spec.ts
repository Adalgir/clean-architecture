import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "name", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price is less then zero", () => {
    expect(() => {
      const product = new Product("1", "name", -1);
    }).toThrow("Price is required");
  });

  it("should change name", () => {
    const product = new Product("1", "name", 100);
    product.changeName("new name");
    expect(product.name).toBe("new name");
  });

  it("should change price", () => {
    const product = new Product("1", "name", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
