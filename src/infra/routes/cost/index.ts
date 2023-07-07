import { Router } from "express";
import { addNewCostRouter } from "@infra/routes/cost/addNewCost.route"
import { getCostsListRouter } from "@infra/routes/cost/getCostList.route"

export const costRouter = Router()

costRouter.use('/costs', addNewCostRouter)
costRouter.use('/costs', getCostsListRouter)
