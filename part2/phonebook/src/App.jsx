import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const personsToShow = persons.filter(person => 
  person.name.toLowerCase().includes(searchQuery.toLowerCase())
)

  const addPerson = (newPerson) => {
    setPersons(persons.concat(newPerson))
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} onAddPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons onShowPerson={personsToShow}/>
    </div>
  )
}

export default App