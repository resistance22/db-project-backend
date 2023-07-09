export class AddProductCostUseCase {
  constructor(private productRepo: ProductNS.IProductRepository) { }

  async execute(product_id: number, cost_id: number, creator_id: number, quantity: number) {
    const insertedProduct = await this.productRepo.addCostTypeToProduct(product_id, cost_id, creator_id, quantity)

    if (insertedProduct === null) {
      throw Error("SomeThing went wrong!")
    } else {
      return insertedProduct
    }
  }
}