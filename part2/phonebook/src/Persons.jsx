const Persons = ({onShowPerson, onDeletePerson}) => {

  return (
    <>
        {onShowPerson.map(person => 
        <li key={person.name}>
          <p>{person.name} {person.number} <button onClick={() => onDeletePerson(person.id, person.name)}>delete</button></p>
        </li>
         )}
    </>  
  )
}

export default Persons