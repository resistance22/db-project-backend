import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostAmountRepo } from "@/repos/costAamount.repo"

export const getListByCostController = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new CostAmountRepo()
  try {
    const amountList = await userRepository.getCostAmountListByCostID(parseInt(req.params.costID), req.query)
    return res.json(amountList)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}