import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import { FindAllResult } from "../../../../domain/@shared/repository/repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.getId(),
      name: entity.getName(),
      price: entity.getPrice(),
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.getName(),
        price: entity.getPrice(),
      },
      {
        where: { id: entity.getId() },
      }
    );
  }
  async findOne(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(
    pageSize: number,
    page: number
  ): Promise<FindAllResult<Product>> {
    const productModels = await ProductModel.findAll({
      offset: pageSize * (page - 1),
    });

    return {
      count: productModels.length,
      data: productModels.map(
        ({ id, name, price }) => new Product(id, name, price)
      ),
    };
  }
}
