import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

test('callback function given in props is called correctly', () => {
  const addBlog = jest.fn()

  const component = render(<BlogForm createBlog={addBlog} />)

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Ant Man' },
  })
  fireEvent.change(title, {
    target: { value: 'Some Random Blog' },
  })
  fireEvent.change(url, {
    target: { value: 'random.org' },
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Some Random Blog')

  
})
