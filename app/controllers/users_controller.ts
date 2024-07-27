import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({}: HttpContext) {}

  async store({ request, response }: HttpContext) {
    const newUserData = await createUserValidator.validate(request.all())

    await User.create({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: newUserData.password,
    })

    return response.created()
  }

  async show({ params }: HttpContext) {
    const userData = await User.findByOrFail(params.id)

    return userData
  }

  async edit({ params }: HttpContext) {}

  async update({ params, request, response }: HttpContext) {
    const newUserData = await updateUserValidator.validate(request.all())

    const user = await User.findOrFail(params.id)

    await user
      .merge({
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: newUserData.email,
        password: newUserData.password,
      })
      .save()

    return response.ok('User updated!')
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    const userIsDeleted = await User.find(params.id)

    if (!userIsDeleted) {
      return response.badRequest()
    }

    return response.ok('User has deleted')
  }
}
