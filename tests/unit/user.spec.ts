import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

test.group('create a user', () => {
  test('should be able to create a user', async ({ assert, client }) => {
    const newUserData = await UserFactory.make()

    const response = await client.post('/users.store').json({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: '1234567',
    })

    response.assertStatus(201)

    const user = await User.query().where('email', newUserData.email).firstOrFail()

    assert.exists(user)
    assert.equal(user.firstName, newUserData.firstName)
    assert.equal(user.lastName, newUserData.lastName)
    assert.equal(user.email, newUserData.email)
  })

  test('should be able to hash user password when creating a new user', async ({
    assert,
    client,
  }) => {
    const password = 'Ab123456'
    const newUserData = await UserFactory.merge({ password: password }).make()

    await client.post('/users').json({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: newUserData.password,
    })

    assert.isTrue(hash.isValidHash(newUserData.password))
    assert.isTrue(await hash.verify(newUserData.password, password))
  })
})

test.group('update a user', () => {
  test('should be able to update a user', async ({ assert, client }) => {
    const newUserData = await UserFactory.make()

    await client.post('/users').json({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: newUserData.password,
    })

    const createdUser = await User.find(newUserData.email)

    assert.exists(createdUser)
  })

  test('should be able to hash user password when update a user', async ({ assert }) => {
    const user = new User()
    user.password = '12345678'

    await user.save()

    assert.isTrue(hash.isValidHash(user.password))
    assert.isTrue(await hash.verify(user.password, '12345678'))
  })
})
