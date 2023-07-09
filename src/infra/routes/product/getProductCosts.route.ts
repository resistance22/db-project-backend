import { Router } from "express";
import { middlewareFactory } from '@middlewares/index'
import { getProductCostsController } from '@controllers/product/getCosts.controller'
import { ROLES } from "@/Enums"

export const getProductCostsRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

getProductCostsRouter.get("/costs/:productID", authMiddleware, getProductCostsController);