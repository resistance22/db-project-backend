import { Router } from "express";
import { addNewProductRouter } from "@infra/routes/product/add.route"
import { getProductsListRouter } from "@infra/routes/product/getList.route"
import { getProductByIDRouter } from "@infra/routes/product/getByID.route"
import { updateProductRouter } from "@infra/routes/product/update.route"
import { addCostToProductRouter } from "@infra/routes/product/addCost.route"
import { getProductCostsRouter } from "@/infra/routes/product/getProductCosts.route";

export const prodcutRouter = Router()

prodcutRouter.use(
  '/products',
  addNewProductRouter,
  getProductsListRouter,
  getProductByIDRouter,
  updateProductRouter,
  addCostToProductRouter,
  getProductCostsRouter
)

