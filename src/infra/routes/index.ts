import { Router } from "express";
import { usersRouter } from "@infra/routes/users/index"
import { authRouter } from "@infra/routes/auth/index"
import { costRouter } from "@infra/routes/cost/index"
import { costAmountRouter } from "@/infra/routes/costAmount";

export const globalRouter = Router()

globalRouter.use('/', authRouter)
globalRouter.use('/', usersRouter)
globalRouter.use('/', costRouter)
globalRouter.use('/', costAmountRouter)
