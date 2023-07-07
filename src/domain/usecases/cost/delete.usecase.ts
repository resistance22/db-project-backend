import { DuplicateError } from "@/domain/errors/DuplicateError"
import { NotFoundError } from "@/domain/errors/NotFoundError"

export class DeleteCostUseCase implements CostNS.UseCases.IDelteCost {
  userRepo: CostNS.ICostRepository
  constructor(private costRepo: CostNS.ICostRepository) { }

  async execute(id: number) {
    const foundCost = await this.costRepo.getCostByID(id)

    if (foundCost == null) {
      throw new NotFoundError("موردی یافت نشد")
    }

    const deletedCost = await this.costRepo.deleteCost(id)

    if (deletedCost == null) {
      throw new Error("مشکلی پیش آمده")
    }

    return deletedCost

  }
}