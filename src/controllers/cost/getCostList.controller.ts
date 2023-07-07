import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { CostRepo } from "@/repos/cost.repo"

export const getCostListController = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new CostRepo()
  try {
    const userList = await userRepository.getCostList(req.query);
    return res.json(userList)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}