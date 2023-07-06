
export class AddCostUseCase implements CostNS.UseCases.IAddCost {
  userRepo: CostNS.ICostRepository
  constructor(private costRepo: CostNS.ICostRepository) { }

  async execute(costData: CostNS.DTO.NewCost, creator_id: number) {
    const addedCost = await this.costRepo.insertNewCost(costData, creator_id);
    if (addedCost === null) {
      throw Error("Test")
    } else {
      return addedCost
    }
  }
}