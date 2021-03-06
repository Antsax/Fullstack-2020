const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const initialUsers = [
  {
    _id: '601a9900495cd52a6d546a73',
    username: 'aad',
    passwordHash:
      '$2b$10$41XisOhPesbcZKLGQMQuje5S.Pv/LoDHBKDgYT0ckP3EgVet/cfqS',
    name: 'Aad Tester',
    __v: 0,
  },
  {
    _id: '601a963e474e8f22966ad02f',
    username: 'aantsax',
    passwordHash:
      '$2b$10$S83Dwxsvx2UMotf.NADvNeqI4SBG0BXj2/DC6xtEttT4LC9M0YeEW',
    name: 'Antman',
    __v: 0,
  },
  {
    _id: '601d4193d112c361b6913fd4',
    username: 'SuperTester',
    passwordHash:
      '$2b$10$JfI5MIImKUHqYqr1IO.neO1rBLu4/jCKp81MOahrpsIUn.oIFyhxu',
    name: 'Testy Tster',
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temove this blog',
    author: 'antsax',
    url: 'something.com',
    likes: 24,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const response = await Blog.find({})
  return response.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const response = await User.find({})
  return response.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
