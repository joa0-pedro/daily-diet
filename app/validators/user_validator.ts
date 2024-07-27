import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3),
    lastName: vine.string(),
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(3)
      .maxLength(16)
      .confirmed({ confirmationField: 'confimPassWord' }),
    confirmPassword: vine.string().minLength(3).maxLength(16),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3),
    lastName: vine.string(),
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(3)
      .maxLength(16)
      .confirmed({ confirmationField: 'confimPassWord' }),
    confirmPassword: vine.string().minLength(3).maxLength(16),
  })
)
