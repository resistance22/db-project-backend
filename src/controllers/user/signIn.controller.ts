import { Request, Response, NextFunction } from "express"
import { UserSignIn } from "@usecases/user/signIn.usecase"
import { UserRepo } from "@repos/user.repo"
import { UserUtils } from '@infra/UserUtils'
import { HTTPError } from "@assets/HTTPError"

export const userSignInController = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepo()
    const userUtils = new UserUtils()

    const userSignInUseCase = new UserSignIn(
        userRepository,
        userUtils
    )

    try {
        const { tokens, user } = await userSignInUseCase.execute(req.body)
        res.cookie("Auth", tokens.accessToken, {
            httpOnly: true,
            secure: false
        })
        res.json({
            user
        })
    } catch (e: any) {
        if (e.name == "WrongCrudentials") {
            const error = new HTTPError(401, "Wrong Crudentials Provided", ["Wrong Crudentials Provided"])
            return next(error)
        }
        return next(e)
    }
}