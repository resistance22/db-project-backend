import { RequestHandler } from "express"
import { CostAmount as CostAmountEntity } from "@entities/CostAmount.entity"
export { }

declare global {
  declare namespace CostAmountNS {
    declare namespace DTO {
      interface NewCostAmount {
        value: number
        date: string
      }
    }

    declare namespace UseCases {
      // interface IAddCost {
      //   execute(costData: CostAmountNS.DTO.NewCost, creator_id: number): Promise<CostAmountEntity>,
      // }
    }

    interface getCostAmountQuery {
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: sortOrder
    }

    interface ICostAmountRepository {
      insertNewCostAmount(cost: CostAmountNS.DTO.NewCostAmount, creator_id: number, cost_id): Promise<CostAmountEntity | null>
    }

    interface IUserEntity extends UserEntitiy { }

  }
}