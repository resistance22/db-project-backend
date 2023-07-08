import { Router } from "express";
import { addNewProductRouter } from "@infra/routes/product/add.route"


export const prodcutRouter = Router()

prodcutRouter.use('/products', addNewProductRouter)

