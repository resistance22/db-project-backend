import { Router } from "express";
import { addNewCostRouter } from "@infra/routes/cost/addNewCost.route"
import { getCostsListRouter } from "@infra/routes/cost/getCostList.route"
import { updateCostRouter } from "@infra/routes/cost/updateCost.route"
import { getOneCostRouter } from "@/infra/routes/cost/getOne.route";
import { deleteCostRouter } from "@/infra/routes/cost/deleteCost.route";
import { searcCosthByTitleRoute } from "@/infra/routes/cost/searchByTitle.route"
export const costRouter = Router()

costRouter.use(
  '/costs',
  addNewCostRouter,
  searcCosthByTitleRoute,
  updateCostRouter,
  getCostsListRouter,
  getOneCostRouter,
  deleteCostRouter
)
