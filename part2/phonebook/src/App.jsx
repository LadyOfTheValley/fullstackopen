import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  

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
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} onAddPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons onShowPerson={personsToShow} onDeletePerson={deletePerson}/>
    </div>
  )
}

export default App