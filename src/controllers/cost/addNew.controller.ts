import { Request, Response, NextFunction } from "express"

import { UserUtils } from '@infra/UserUtils'
import { HTTPError } from "@/assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"
import { AddCostUseCase } from "@/domain/usecases/cost/add.usecase"

export const addNewCostController = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new CostRepo()
  const addCostUseCase = new AddCostUseCase(
    userRepository,
  )

  if (!req.user) {
    const err = new HTTPError(401, "Missing Authroization", [])
    return next(err)
  }

  try {
    const createdCost = await addCostUseCase.execute(req.body, req.user.user_id)
    return res.json(createdCost)
  } catch (e: any) {
    if (e.name == "DuplicateError") {
      const err = new HTTPError(409, e.message, [])
      return next(err)
    }
    return next(e)
  }
}