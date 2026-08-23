const Persons = ({onShowPerson}) => {

  return (
    <>
        {onShowPerson.map(person => 
        <li key={person.name}>
          <p>{person.name} {person.number}</p>
        </li>
         )}
    </>  
  )
}

export default Persons