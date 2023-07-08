import { RequestHandler } from "express"
import { CostAmount as CostAmountEntity } from "@entities/CostAmount.entity"
export { }

declare global {
  declare namespace CostAmountNS {
    declare namespace DTO {
      interface NewCostAmount {
        unit_price: number
        cost_id: number
      }
    }

    declare namespace UseCases {
      interface IAddCostAmount {
        execute(cosAmountData: CostAmountNS.DTO.NewCost, creator_id: number, cost_id: number): Promise<CostAmountEntity>,
      }
    }

    interface getCostAmountQuery {
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: sortOrder
    }

    interface ICostAmountRepository {
      insertNewCostAmount(cost: CostAmountNS.DTO.NewCostAmount, creator_id: number, cost_id): Promise<CostAmountEntity | null>
      getCostAmountByID(cost_id: number): Promise<CostAmountEntity | null>
    }

    interface IUserEntity extends UserEntitiy { }

  }
}