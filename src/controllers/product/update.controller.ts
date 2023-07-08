import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { ProductRepo } from "@/repos/product.repo"
import { AddProductUseCase } from "@/domain/usecases/product/add.usecase"

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()
  const UpdateProductUseCase = new AddProductUseCase(
    repo,
  )

  try {
    const updatedProduct = await UpdateProductUseCase.execute(req.body, parseInt(req.params.productID))
    return res.json(updatedProduct)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}