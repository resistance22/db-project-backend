import { Router } from "express";
import { NewProductValidator } from "@validators/Product.validator"
import { middlewareFactory } from '@middlewares/index'
import { addProductContoller } from '@controllers/product/add.controller'
import { ROLES } from "@/Enums"

export const addNewProductRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewProductValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

addNewProductRouter.post("/", authMiddleware, bodyValidator, addProductContoller);