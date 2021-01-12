import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from '../services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you wish to replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id
        personService
          .update(id, personObject)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
          )
          .catch((error) => {
            setNotification(
              `${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })

        setNotification(`${newName} updated successfully!`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))

      setNotification(`${newName} added successfully!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setNotification(`${name} has already been removed from the server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

      setNotification(`${name} removed successfully!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(showAll.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <Filter showAll={showAll} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} removePerson={removePerson} />
    </div>
  )
}

export default App
