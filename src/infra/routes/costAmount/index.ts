import { Router } from "express"
import { addNewCostAmountRouter } from "@/infra/routes/costAmount/add.route"

export const costAmountRouter = Router()

costAmountRouter.use('/costs/amount/', addNewCostAmountRouter)
