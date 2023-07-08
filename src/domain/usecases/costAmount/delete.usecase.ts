import { DuplicateError } from "@/domain/errors/DuplicateError"
import { NotFoundError } from "@/domain/errors/NotFoundError"

export class DeleteAmountUseCase implements CostAmountNS.UseCases.IDeleteCostAmount {
  userRepo: CostAmountNS.ICostAmountRepository
  constructor(private amountRepo: CostAmountNS.ICostAmountRepository) { }

  async execute(id: number) {
    const foundCost = await this.amountRepo.getCostAmountByID(id)

    if (foundCost == null) {
      throw new NotFoundError("موردی یافت نشد")
    }

    const deletedCost = await this.amountRepo.deleteCostAmount(id)

    if (deletedCost == null) {
      throw new Error("مشکلی پیش آمده")
    }

    return deletedCost

  }
}