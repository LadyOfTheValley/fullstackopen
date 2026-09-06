import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import personService from './services/personService'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState({ message: null, isError: false })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null, isError: false })
    }, 5000)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const personsToShow = persons.filter(person => 
  person.name.toLowerCase().includes(searchQuery.toLowerCase())
)

  const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }
}
  const addPerson = (personObject) => {
    const existingPerson = persons.find(p => p.name.toLowerCase() === personObject.name.toLowerCase())

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPersonObject = { ...existingPerson, number: personObject.number }

        personService
          .update(existingPerson.id, updatedPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== existingPerson.id ? p : returnedPerson)))
            showNotification(`Updated ${existingPerson.name}'s number`, false)
          })
          .catch(error => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              true
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${returnedPerson.name}`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError} />
      <Filter searchQuery={searchQuery} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} onAddPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons onShowPerson={personsToShow} onDeletePerson={deletePerson}/>
    </div>
  )
}

export default App