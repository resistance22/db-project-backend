import Joi from "joi"

export const NewProduct = Joi.object({
  title: Joi.string().required(),
})



export const NewProductValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = NewProduct.validate(entity)
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