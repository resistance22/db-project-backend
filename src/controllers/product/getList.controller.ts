import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { ProductRepo } from "@/repos/product.repo"

export const getProdcutsListContoller = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new ProductRepo()

  try {
    const userList = await repo.getProductsList(req.query)
    return res.json(userList)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}