import { useState } from 'react'
import axios from 'axios'

const PersonForm = ({persons, onAddPerson}) => {

      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')

      const addName = (event) => {
        event.preventDefault()
        console.log('button clicked', {persons})

        if ( persons.some(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return //
        }

        const PersonObject = {
            name: newName,
            number: newNumber,
        }

        axios
            .post('http://localhost:3001/persons', PersonObject)
            .then(response => {
            onAddPerson(PersonObject)
            console.log(response)
            })        
        // 

        setNewName('')
        setNewNumber('')
        }
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

  return (
    <form onSubmit={addName}>
        <div>
        name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)
}

export default PersonForm