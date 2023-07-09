import { Router } from "express";
import { searchCostByTitleController } from '@controllers/cost/search.controller'
import { middlewareFactory } from "@/middlewares";
import { ROLES } from "@/Enums";

export const searcCosthByTitleRoute = Router()

const authMiddleware = middlewareFactory({
  "type": "AuthMiddleware",
  roles: [ROLES.ADMIN, ROLES.PURCHASING, ROLES.SALES]
})

searcCosthByTitleRoute.get("/search/:searchTerm", authMiddleware, searchCostByTitleController);