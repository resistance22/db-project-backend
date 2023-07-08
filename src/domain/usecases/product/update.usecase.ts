import { Product } from "@/domain/enitity/Product.entity"
import { DuplicateError } from "@/domain/errors/DuplicateError"

export class UpdateProductUseCase implements ProductNS.UseCases.IAddProduct {
  constructor(private productRepo: ProductNS.IProductRepository) { }

  async execute(productData: ProductNS.DTO.NewProduct, product_id: number) {

    const updatedCost = await this.productRepo.updateProduct(product_id, productData)
    if (updatedCost === null) {
      throw Error("SomeThing went wrong!")
    } else {
      return updatedCost
    }
  }
}