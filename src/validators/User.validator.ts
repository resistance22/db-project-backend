import Joi from "joi"

export const NewUserJ = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.string().required(),
  password: Joi.string().required().min(8),
  confirm_pass: Joi.string().required().valid(Joi.ref('password')).messages({ "any.only": "Passwords do not match" }),
  role: Joi.number().integer().min(1).max(3).required(),
})

export const UserJ = Joi.object({
  id: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email(),
  phone_number: Joi.string().required(),
  email_confimred: Joi.boolean().required(),
  registered_at: Joi.string().required(),
  updated_at: Joi.string().required(),
  role: Joi.number().integer().min(1).max(3).required(),
})


export const NewUserValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = NewUserJ.validate(entity)
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