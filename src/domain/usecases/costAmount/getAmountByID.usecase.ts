import { NotFoundError } from "@/domain/errors/NotFoundError"

export class GetOneAmountUseCase implements CostAmountNS.UseCases.IGetAmountBYID {
  userRepo: CostAmountNS.ICostAmountRepository
  constructor(private costRepo: CostAmountNS.ICostAmountRepository) { }

  async execute(id: number) {
    const foundCost = await this.costRepo.getCostAmountByID(id)

    if (foundCost == null) {
      throw new NotFoundError("موردی یافت نشد")
    }

    return foundCost

  }
}