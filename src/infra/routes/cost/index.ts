import { Router } from "express";
import { addNewCostRouter } from "@infra/routes/cost/addNewCost.route"

export const usersRouter = Router()

usersRouter.use('/costs', addNewCostRouter)
