import { Request, Response, NextFunction } from "express"
import { UserRegister } from "@usecases/User/register.usecase"
import { UserRepo } from "@repos/user.repo"
import { UserUtils } from '@infra/UserUtils'

const userSignInController = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepo()
    const userUtils = new UserUtils()

    const userRegisterUseCase = new UserRegister(
        userRepository,
        userUtils
    )
    
    try {
        const res = await userRegisterUseCase.execute(req.body)
    } catch(e){
        return next(e)
    }
}