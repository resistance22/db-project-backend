import { Router } from "express";
import { NewProductValidator } from "@validators/Product.validator"
import { middlewareFactory } from '@middlewares/index'
import { updateProductController } from '@controllers/product/update.controller'
import { ROLES } from "@/Enums"

export const updateProductRouter = Router()

const bodyValidator = middlewareFactory({
  "type": "BodyValidator",
  "dto": NewProductValidator
})

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

updateProductRouter.put("/:productID", authMiddleware, bodyValidator, updateProductController);