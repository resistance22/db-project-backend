import { CostAmount } from "@/domain/enitity/CostAmount.entity";

export class UpdateCostAmountUseCase implements CostAmountNS.UseCases.IUpdateCostAmount {
  constructor(private costAmountRepo: CostAmountNS.ICostAmountRepository) { }

  async execute(cost_id: number, costData: CostAmountNS.DTO.UpdateCostAmount) {

    const updatedCostAmount = await this.costAmountRepo.updateCostAmount(cost_id, costData)
    if (updatedCostAmount === null) {
      throw Error("SomeThing went wrong!")
    } else {
      return updatedCostAmount
    }
  }

}