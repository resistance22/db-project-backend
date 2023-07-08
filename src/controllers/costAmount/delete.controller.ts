import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostAmountRepo } from "@/repos/costAamount.repo"
import { DeleteAmountUseCase } from "@/domain/usecases/costAmount/delete.usecase"

export const deleteCostController = async (req: Request, res: Response, next: NextFunction) => {
  const repo = new CostAmountRepo()
  const delteCostAmountUC = new DeleteAmountUseCase(
    repo,
  )

  try {
    const deletedCost = await delteCostAmountUC.execute(parseInt(req.params.costID));
    return res.json(deletedCost)
  } catch (e: any) {
    if (e.name == "NotFoundError") {
      const err = new HTTPError(400, e.message, [])
      return next(err)
    }

    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}