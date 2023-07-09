import { RequestHandler } from "express"
import { Cost as CostEntity } from "@entities/Cost.entity"
export { }

declare global {
  declare namespace CostNS {
    declare namespace DTO {
      interface NewCost {
        title: string
      }
      interface IUser extends NewCost {
        id: string
        creator_user_id: number
        created_at: string
        updated_at: string
      }
    }

    declare namespace UseCases {
      interface IAddCost {
        execute(costData: CostNS.DTO.NewCost, creator_id: number): Promise<CostEntity>,
      }

      interface IGetOneCost {
        execute(id: number): Promise<CostEntity>,
      }

      interface IDelteCost {
        execute(id: number): Promise<CostEntity>,
      }
    }

    interface getCostQuery {
      page?: number
      per_page?: number
      sort_by?: string
      sort_order?: sortOrder
    }

    interface ICostRepository {
      insertNewCost(cost: CostNS.DTO.NewCost, creator_id: number): Promise<CostEntity | null>
      getCostByID(id: number): Promise<CostEntity | null>
      getCostByTitle(title: string): Promise<CostEntity | null>
      getCostList(query?: getCostQuery): Promise<{
        result: CostEntity[],
        meta: {
          total: number
        }
      }>
      updateCost(id: number, cost: CostNS.DTO.NewCost): Promise<CostEntity | null>
      deleteCost(id: number): Promise<CostEntity | null>
      searchCostByTitle(title: string): Promise<CostEntity[] | null>
    }

    interface IUserEntity extends UserEntitiy { }

  }
}