import Joi from "joi"

export const signInJ = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required()
})



export const SignInValidator: IValidator = {
  validate: (entity: Object) => {
    const { error } = signInJ.validate(entity)
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