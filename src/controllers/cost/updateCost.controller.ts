import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@/assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"
import { UpdateCostUseCase } from "@/domain/usecases/cost/update.usecase"

export const updateCostController = async (req: Request, res: Response, next: NextFunction) => {
  const costRepository = new CostRepo()
  const addCostUseCase = new UpdateCostUseCase(
    costRepository,
  )


  try {
    const updatedCost = await addCostUseCase.execute(req.body, parseInt(req.params.costID))
    return res.json(updatedCost)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}