import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const produtc = ProductFactory.create("a", "Product 1", 10);

const input = {
  id: produtc.id,
  name: "Product Atualizado",
  price: 20,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(produtc)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
