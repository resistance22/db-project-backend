import { DuplicateError } from "@/domain/errors/DuplicateError"

export class AddCostAmountUseCase implements CostAmountNS.UseCases.IAddCostAmount {
  constructor(private costAmountRepo: CostAmountNS.ICostAmountRepository) { }

  async execute(cosAmountData: CostAmountNS.DTO.NewCostAmount, creator_id: number, cost_id: number) {
    try {
      const addedCostAmount = await this.costAmountRepo.insertNewCostAmount(cosAmountData, creator_id, cost_id)
      if (addedCostAmount == null) {
        throw Error("SomeThing went wrong!")
      }
      return addedCostAmount
    } catch (e) {
      console.log(e)
      throw Error("SomeThing went wrong!")
    }
  }
}