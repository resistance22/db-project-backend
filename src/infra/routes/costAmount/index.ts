import { Router } from "express"
import { addNewCostAmountRouter } from "@/infra/routes/costAmount/add.route"
import { getAmountByCostRouter } from "@/infra/routes/costAmount/getListByCost.route"
import { updateCostAmountRouter } from "@/infra/routes/costAmount/update.route"
import { getOneAmountRouter } from "@/infra/routes/costAmount/getOne.route"
export const costAmountRouter = Router()

costAmountRouter.use('/costs/amount/', addNewCostAmountRouter)
costAmountRouter.use('/costs/amount/', getAmountByCostRouter)
costAmountRouter.use('/costs/amount/', updateCostAmountRouter)
costAmountRouter.use('/amount', getOneAmountRouter)
