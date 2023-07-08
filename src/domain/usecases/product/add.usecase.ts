export class AddProductUseCase implements ProductNS.UseCases.IAddProduct {
  constructor(private productRepo: ProductNS.IProductRepository) { }

  async execute(cosAmountData: ProductNS.DTO.NewProduct, creator_id: number) {
    const insertedProduct = await this.productRepo.insertNewProduct(cosAmountData, creator_id)

    if (insertedProduct === null) {
      throw Error("SomeThing went wrong!")
    } else {
      return insertedProduct
    }
  }
}