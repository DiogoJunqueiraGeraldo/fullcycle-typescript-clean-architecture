import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const newProductModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(newProductModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    const foundProduct = await productRepository.findOne("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.getId(),
      name: foundProduct.getName(),
      price: foundProduct.getPrice(),
    });
  });

  it("should find all product", async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "Product 1", 100);
    const p2 = new Product("2", "Product 2", 200);
    const p3 = new Product("3", "Product 2", 300);

    await productRepository.create(p1);
    await productRepository.create(p2);
    await productRepository.create(p3);

    const foundProducts = await productRepository.findAll(3, 1);
    const expectedProducts = [p1, p2, p3];

    expect(foundProducts.count).toBe(expectedProducts.length);
    expect(foundProducts.data.length).toBe(expectedProducts.length);
    expect(foundProducts.data).toEqual(expectedProducts);
  });
});
