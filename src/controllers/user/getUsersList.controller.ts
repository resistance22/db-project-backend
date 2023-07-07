import { Request, Response, NextFunction } from "express"
import { HTTPError } from "@assets/HTTPError"
import { UserRepo } from "@/repos/user.repo"
import jwt from 'jsonwebtoken'

export const getUsersListController = async (req: Request, res: Response, next: NextFunction) => {

  const userRepository = new UserRepo()
  try {
    const userList = await userRepository.getUsersList(req.query);
    return res.json(userList)
  } catch (e) {
    console.log(e)
    return next(new HTTPError(500, 'Something Went Wrong!', []))
  }
}