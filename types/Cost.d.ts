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

    }

    interface ICostRepository {
      insertNewCost(cost: CostNS.DTO.NewCost, creator_id: number): Promise<CostEntity>
      getCostByID(id: number): Promise<CostEntity | null>
    }

    interface IUserEntity extends UserEntitiy { }

  }
}