import Joi from "joi"

export const NewCostAmount = Joi.object({
  unit_price: Joi.number().required(),
})

export const UpdateCostAmount = Joi.object({
  unit_price: Joi.number().required(),
  created_at: Joi.string().required()
})


export const UpdateCostAmountValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = UpdateCostAmount.validate(entity)
    if (error == null) {
      return {
        validated: true,
        messages: null
      } as ValidationsResult
    }
    return {
      validated: false,
      messages: error.details.map(errorDetail => errorDetail.message)
    } as ValidationsResult
  }
}



export const NewCostAmountValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = NewCostAmount.validate(entity)
    if (error == null) {
      return {
        validated: true,
        messages: null
      } as ValidationsResult
    }
    return {
      validated: false,
      messages: error.details.map(errorDetail => errorDetail.message)
    } as ValidationsResult
  }
}