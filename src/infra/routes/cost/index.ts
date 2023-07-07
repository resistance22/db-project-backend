import { Router } from "express";
import { addNewCostRouter } from "@infra/routes/cost/addNewCost.route"

export const costRouter = Router()

costRouter.use('/costs', addNewCostRouter)
