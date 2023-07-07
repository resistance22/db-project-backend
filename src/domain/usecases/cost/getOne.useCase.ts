import { DuplicateError } from "@/domain/errors/DuplicateError"
import { NotFoundError } from "@/domain/errors/NotFoundError"

export class GetOneCostUseCase implements CostNS.UseCases.IGetOneCost {
  userRepo: CostNS.ICostRepository
  constructor(private costRepo: CostNS.ICostRepository) { }

  async execute(id: number) {
    const foundCost = await this.costRepo.getCostByID(id)

    if (foundCost == null) {
      throw new NotFoundError("موردی یافت نشد")
    }

    return foundCost

  }
}