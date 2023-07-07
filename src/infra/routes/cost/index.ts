import { Router } from "express";
import { addNewCostRouter } from "@infra/routes/cost/addNewCost.route"
import { getCostsListRouter } from "@infra/routes/cost/getCostList.route"
import { updateCostRouter } from "@infra/routes/cost/updateCost.route"
import { getOneCostRouter } from "@/infra/routes/cost/getOne.route";

export const costRouter = Router()

costRouter.use('/costs', addNewCostRouter)
costRouter.use('/costs', getCostsListRouter)
costRouter.use('/costs', updateCostRouter)
costRouter.use('/costs', getOneCostRouter)
