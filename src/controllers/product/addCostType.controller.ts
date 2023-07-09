import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"
import { ProductRepo } from "@/repos/product.repo"
import { AddProductUseCase } from "@/domain/usecases/product/add.usecase"
import { AddProductCostUseCase } from "@/domain/usecases/product/addCost.usecast"

export const addCostToProductContoller = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()
  const addProductUseCase = new AddProductCostUseCase(
    repo,
  )

  if (!req.user) {
    const err = new HTTPError(401, "Missing Authroization", [])
    return next(err)
  }

  try {
    const createdProductCost = await addProductUseCase.execute(req.body.product_id, req.body.cost_id, req.user.user_id, req.body.quantity)
    return res.json(createdProductCost)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}