import { DuplicateError } from "@/domain/errors/DuplicateError"

export class AddCostUseCase implements CostNS.UseCases.IAddCost {
  userRepo: CostNS.ICostRepository
  constructor(private costRepo: CostNS.ICostRepository) { }

  async execute(costData: CostNS.DTO.NewCost, creator_id: number) {
    const foundCost = await this.costRepo.getCostByTitle(costData.title)

    if (foundCost != null) {
      throw new DuplicateError("title", "عنوان باید یکتا باشد")
    }

    const addedCost = await this.costRepo.insertNewCost(costData, creator_id)
    if (addedCost === null) {
      throw Error("SomeThing went wrong!")
    } else {
      return addedCost
    }
  }
}