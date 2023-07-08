import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { UpdateCostAmountUseCase } from "@/domain/usecases/costAmount/update.usecase"
import { CostAmountRepo } from "@/repos/costAamount.repo"

export const updateCostAmountController = async (req: Request, res: Response, next: NextFunction) => {
  const costAmountRepository = new CostAmountRepo()
  const updateCostAmountUseCase = new UpdateCostAmountUseCase(
    costAmountRepository,
  )

  try {
    const updatedCostAmount = await updateCostAmountUseCase.execute(parseInt(req.params.costID), req.body)
    return res.json(updatedCostAmount)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}