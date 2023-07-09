import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { ProductRepo } from "@/repos/product.repo"

export const getProductCostsController = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()

  try {
    const foundProduct = await repo.getProductCosts(parseInt(req.params.productID))
    if (foundProduct == null) {
      return next(new HTTPError(404, 'محصول یافت نشد!', []))
    }
    return res.json(foundProduct)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}