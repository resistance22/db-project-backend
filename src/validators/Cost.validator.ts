import Joi from "joi"

export const NewCost = Joi.object({
  title: Joi.string().required(),
})



export const NewCostValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = NewCost.validate(entity)
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