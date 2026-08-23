import { useState } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
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