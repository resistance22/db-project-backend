import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"

export const deleteCostController = async (req: Request, res: Response, next: NextFunction) => {
  const costRepo = new CostRepo()
  try {
    const foundCost = await costRepo.deleteCost(parseInt(req.params.costID));
    return res.json(foundCost)
  } catch (e: any) {
    if (e.name == "NotFoundError") {
      const err = new HTTPError(400, e.message, [])
      return next(err)
    }

    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}