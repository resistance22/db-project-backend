import { Router } from "express";
import { middlewareFactory } from '@middlewares/index'
import { getProdcutsListContoller } from '@controllers/product/getList.controller'
import { ROLES } from "@/Enums"

export const getProductsListRouter = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.SALES]
})

getProductsListRouter.get("/", authMiddleware, getProdcutsListContoller);