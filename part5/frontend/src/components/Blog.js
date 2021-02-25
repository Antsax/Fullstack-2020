import React, { useState } from 'react'

const Blog = ({ user, blog, handleLike, handleDeletion }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleClick = async (event) => {
    event.preventDefault()

    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    handleLike(newBlog, blog.id)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    handleDeletion(blog)
  }

  return (
    <div style={blogStyle} className="blogDiv"> 
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleClick}>like</button> <br />
        {blog.user.username} <br />
        <button
          style={{
            display: user.username === blog.user.username ? '' : 'none',
          }}
          onClick={handleRemove}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
