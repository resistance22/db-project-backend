import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"

export const searchCostByTitleController = async (req: Request, res: Response, next: NextFunction) => {
  const costRepo = new CostRepo()
  try {
    const costList = await costRepo.searchCostByTitle(req.params.searchTerm);
    return res.json(costList)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}