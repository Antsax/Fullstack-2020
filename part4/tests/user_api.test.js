const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('user creation tests', () => {
  test('correct amount of users returned', async () => {
    const result = await helper.usersInDb()
    expect(result).toHaveLength(3)
  })

  test('new user added', async () => {
    const newUser = {
      username: 'somerandomuser',
      password: 'thisismypassword',
      name: 'user tester',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)

    const response = await helper.usersInDb()
    expect(response).toHaveLength(helper.initialUsers.length + 1)
  })
  

  test('incorrect user not added', async () => {
    const newUser = {
      username: 'ad',
      password: 'ba',
      name: 'false user',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const response = await helper.usersInDb()
    expect(response).toHaveLength(helper.initialUsers.length)
  })

  test('existing username not added', async () => {
    const newUser = {
      username: 'random',
      password: 'something123',
      name: 'correct user',
    }

    const copyUser = {
      username: 'random',
      password: 'something',
      name: 'false user',
    }

    await api.post('/api/users').send(newUser)
    await api.post('/api/users').send(copyUser).expect(400)

    const response = await helper.usersInDb()
    expect(response).toHaveLength(helper.initialUsers.length + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
