import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"
import { ProductRepo } from "@/repos/product.repo"
import { AddProductUseCase } from "@/domain/usecases/product/add.usecase"

export const addProductContoller = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()
  const addProductUseCase = new AddProductUseCase(
    repo,
  )

  if (!req.user) {
    const err = new HTTPError(401, "Missing Authroization", [])
    return next(err)
  }

  try {
    const craetedProduct = await addProductUseCase.execute(req.body, req.user.user_id)
    return res.json(craetedProduct)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}