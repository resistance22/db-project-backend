import { Router } from "express";
import { registerRouter } from "@infra/routes/auth/register.route"
import { signInRouter } from "@infra/routes/auth/signIn.route"
import { getUserRouter } from "@/infra/routes/auth/getUser.route"
import { logOutRoute } from "@/infra/routes/auth/logout.route"
export const authRouter = Router()

authRouter.use('/auth', registerRouter)
authRouter.use('/auth', signInRouter)
authRouter.use('/auth', getUserRouter)
authRouter.use('/auth', logOutRoute)