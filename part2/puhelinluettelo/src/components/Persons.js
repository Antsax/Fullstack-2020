import React from 'react'

const Persons = ({ peopleToShow, removePerson }) => {
  return (
    <div className="person">
      {peopleToShow.map((person) => (
        <p key={(person.number, person.name)}>
          {person.name} {person.number}{' '}
          <button
            type="delete"
            onClick={() => removePerson({ id: person.id, name: person.name })}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default Persons
