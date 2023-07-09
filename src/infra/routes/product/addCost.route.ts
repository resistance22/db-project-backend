import { Router } from "express";
import { ProductCostValidator } from "@validators/Product.validator"
import { middlewareFactory } from '@middlewares/index'
import { addCostToProductContoller } from '@controllers/product/addCostType.controller'
import { ROLES } from "@/Enums"

export const addCostToProductRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": ProductCostValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

addCostToProductRouter.post("/costs", authMiddleware, bodyValidator, addCostToProductContoller);