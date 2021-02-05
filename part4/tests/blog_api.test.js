const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('simple api tests', () => {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN1cGVyVGVzdGVyIiwiaWQiOiI2MDFkNDE5M2QxMTJjMzYxYjY5MTNmZDQiLCJpYXQiOjE2MTI1MzAwODB9.B_Qt6hUit5qph96Gn75-eT8kW3ZnC446flj8Fw7RI-Y'

  test('right amount of blogs returned', async () => {
    const result = await helper.blogsInDb()
    expect(result).toHaveLength(6)
  })

  test('id field is correct', async () => {
    const result = await helper.blogsInDb()
    expect(result[0].id).toBeDefined()
  })

  test('blog is added', async () => {
    const newBlog = {
      title: 'test new blog',
      author: 'ant man',
      url: 'something.com',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('no likes gives 0 likes', async () => {
    const newBlog = {
      title: 'test new blog',
      author: 'ant man',
      url: 'something.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response[6].likes).toBe(0)
  })

  test('non-valid blog returns status code 400', async () => {
    const newBlog = {
      author: 'ant man',
    }

    await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(400)
  })

  test('adding blog without token returns 401', async () => {
    const newBlog = {
      title: 'test new blog',
      author: 'ant man',
      url: 'something.com',
      likes: 24
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
