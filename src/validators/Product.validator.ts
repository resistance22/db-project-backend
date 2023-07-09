import Joi from "joi"

export const NewProduct = Joi.object({
  title: Joi.string().required(),
})

export const ProductCost = Joi.object({
  quantity: Joi.number().required(),
  product_id: Joi.number().required(),
  cost_id: Joi.number().required(),
})

export const ProductCostValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = ProductCost.validate(entity)
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