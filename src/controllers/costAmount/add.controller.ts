import { Request, Response, NextFunction } from "express"

import { HTTPError } from "@/assets/HTTPError"
import { AddCostAmountUseCase } from "@/domain/usecases/costAmount/add.usecase"
import { CostAmountRepo } from "@/repos/costAamount.repo"

export const addNewCostAmountController = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new CostAmountRepo()
  const addCostUseCase = new AddCostAmountUseCase(
    userRepository,
  )

  if (!req.user) {
    const err = new HTTPError(401, "Missing Authroization", [])
    return next(err)
  }

  try {
    const createdCost = await addCostUseCase.execute(req.body, req.user.user_id, parseInt(req.params.costID))
    return res.json(createdCost)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}