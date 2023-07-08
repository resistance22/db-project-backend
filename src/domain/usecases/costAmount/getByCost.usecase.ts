export class AddCostAmountUseCase implements CostAmountNS.UseCases.IGetListByCost {
  constructor(private costAmountRepo: CostAmountNS.ICostAmountRepository) { }

  async execute(cost_id: number) {
    try {
      const addedCostAmount = await this.costAmountRepo.getCostAmountListByCostID(cost_id)
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