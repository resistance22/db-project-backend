import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { GetOneAmountUseCase } from "@/domain/usecases/costAmount/getAmountByID.usecase"
import { CostAmountRepo } from "@/repos/costAamount.repo"

export const getOneAmountController = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new CostAmountRepo()
  const getOneCostAmountUseCase = new GetOneAmountUseCase(
    repo,
  )
  try {
    const foundCost = await getOneCostAmountUseCase.execute(parseInt(req.params.costID));
    return res.json(foundCost)
  } catch (e: any) {
    if (e.name == "NotFoundError") {
      const err = new HTTPError(400, e.message, [])
      return next(err)
    }

    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}