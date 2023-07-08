import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { ProductRepo } from "@/repos/product.repo"
import { UpdateProductUseCase } from "@/domain/usecases/product/update.usecase"

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()
  const updateProductUseCase = new UpdateProductUseCase(
    repo,
  )

  try {
    const updatedProduct = await updateProductUseCase.execute(req.body, parseInt(req.params.productID))
    return res.json(updatedProduct)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}