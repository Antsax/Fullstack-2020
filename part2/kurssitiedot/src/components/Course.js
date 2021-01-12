import React from 'react'

const Header = ( {name} ) => (
    <h1>{name}</h1>
)

const Content = ( {parts} ) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}

const Total = ( {parts} ) => {
  const total = parts.reduce( (sum, part) => (sum += part.exercises), 0)
  
  return (
    <p>
      <b>total of {total} exercises </b>
    </p>
  )
}

const Part = ( {part: {name, exercises}} ) => (<p> {name} {exercises} </p>)

const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => {
          return (
            <div>
              <Header name={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
          )
        })}
      </div>
    )
}

export default Course