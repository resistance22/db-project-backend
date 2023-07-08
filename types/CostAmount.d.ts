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

      interface UpdateCostAmount {
        unit_price: number
        created_at: string
      }
    }

    declare namespace UseCases {
      interface IAddCostAmount {
        execute(cosAmountData: CostAmountNS.DTO.NewCost, creator_id: number, cost_id: number): Promise<CostAmountEntity>,
      }

      interface IUpdateCostAmount {
        execute(cost_id: number, costData: CostAmountNS.DTO.UpdateCostAmount): Promise<CostAmountEntity>,
      }

      interface IGetAmountBYID {
        execute(cost_id: number): Promise<CostAmountEntity>,
      }

      interface IDeleteCostAmount {
        execute(aount_id: number): Promise<CostAmountEntity>,
      }

      interface IGetListByCost {
        execute(cost_id: number): Promise<{
          result: CostAmountEntity[],
          meta: {
            total: number
          }
        }>,
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
      getCostAmountListByCostID(cost_id: number, query?: getCostAmountQuery): Promise<{
        result: CostAmountEntity[],
        meta: {
          total: number
        }
      } | null>
      updateCostAmount(cost_id: number, costData: CostAmountNS.DTO.UpdateCostAmount): Promise<CostAmountEntity | null>
      deleteCostAmount(cost_id: number): Promise<CostAmountEntity | null>
    }




  }
}