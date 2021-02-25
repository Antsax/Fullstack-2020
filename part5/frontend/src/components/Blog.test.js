import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('liking twice calls eventhandler twice', () => {
  const likeHandler = jest.fn()
  const deletionHandler = jest.fn()

  const blog = {
    author: 'Ant Man',
    title: 'Some Random Blog',
    user: 'antsax',
  }

  const user = {
    username: 'antsax',
  }

  const component = render(
    <Blog
      blog={blog}
      user={user}
      handleLike={likeHandler}
      handleDeletion={deletionHandler}
    />
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})
