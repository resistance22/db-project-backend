import { Request, Response, NextFunction } from "express"
import { UserRegister } from "@usecases/user/register.usecase"
import { UserRepo } from "@repos/user.repo"
import { UserUtils } from '@infra/UserUtils'
import { HTTPError } from "@/assets/HTTPError"

export const userRegisterController = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepo()
    const userUtils = new UserUtils()
    const userRegisterUseCase = new UserRegister(
        userRepository,
        userUtils
    )

    try {
        const { password, ...insertedWithoutPass } = await userRegisterUseCase.execute(req.body)
        return res.json(insertedWithoutPass)
    } catch (e: any) {
        if (e.name == "DuplicateError") {
            const err = new HTTPError(409, e.message, [])
            return next(err)
        }
        return next(e)
    }
}