import { useState } from 'react'

const PersonForm = ({persons, onAddPerson}) => {

      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')

      const addName = (event) => {
        event.preventDefault()
        
        if (!newName.trim() || !newNumber.trim()) {
                    window.alert('Name and number cannot be empty')
                    return
                }

        if ( persons.some(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return //
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }

        onAddPerson(personObject)
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