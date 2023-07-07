import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"
import { DeleteCostUseCase } from "@/domain/usecases/cost/delete.usecase"

export const deleteCostController = async (req: Request, res: Response, next: NextFunction) => {
  const costRepo = new CostRepo()
  const addCostUseCase = new DeleteCostUseCase(
    costRepo,
  )

  try {
    const foundCost = await addCostUseCase.execute(parseInt(req.params.costID));
    return res.json(foundCost)
  } catch (e: any) {
    if (e.name == "NotFoundError") {
      const err = new HTTPError(400, e.message, [])
      return next(err)
    }

    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}