import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div className="blogFormDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          title: <input id='title' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleUrlChange} />
        </div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
