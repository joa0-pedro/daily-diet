import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const userFactoryData = await UserFactory.makeMany(20)

    userFactoryData.map(async (userData) => {
      await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
    })

    await User.create({
      firstName: 'João Pedro',
      lastName: 'Amorim Dias',
      email: 'joaopedro@dev.com',
      password: 'Admin041202',
    })
  }
}
