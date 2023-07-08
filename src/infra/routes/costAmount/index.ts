import { Router } from "express"
import { addNewCostAmountRouter } from "@/infra/routes/costAmount/add.route"
import { getAmountByCostRouter } from "@/infra/routes/costAmount/getListByCost.route"

export const costAmountRouter = Router()

costAmountRouter.use('/costs/amount/', addNewCostAmountRouter)
costAmountRouter.use('/costs/amount', getAmountByCostRouter)
