import { Router } from "express";
import { addNewProductRouter } from "@infra/routes/product/add.route"
import { getProductsListRouter } from "@infra/routes/product/getList.route"
import { getProductByIDRouter } from "@infra/routes/product/getByID.route"


export const prodcutRouter = Router()

prodcutRouter.use('/products', addNewProductRouter)
prodcutRouter.use('/products', getProductsListRouter)
prodcutRouter.use('/products', getProductByIDRouter)

