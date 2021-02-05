const lodash = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.reduce(
    (bestBlog, blog) => (blog.likes > bestBlog.likes ? blog : bestBlog),
    blogs[0]
  )

const mostBlogs = (blogs) => {
  const authorsAndBlogs = lodash(blogs)
    .countBy('author')
    .toPairs()
    .map((entry) => lodash.zipObject(['author', 'blogs'], entry))
  const author = lodash(authorsAndBlogs).last()
  return author
}

const mostLikes = (blogs) => {
  const authorsAndBlogs = lodash(blogs)
    .groupBy('author')
    .map((entry, key) => {
      return {
        author: key,
        likes: lodash.sumBy(entry, 'likes'),
      }
    })
  const authorWithLikes = authorsAndBlogs.orderBy('likes').last()
  return authorWithLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
