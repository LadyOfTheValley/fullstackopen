const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <ul>
      {props.parts.map(part => 
        <li key={part.id}>
          <Part part={part}/>
        </li>
      )}
    </ul>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Total of {props.parts.reduce((sum,part) => sum + part.exercises,0)} exercises
      </p>
    </div>
  )
}
const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>      
    </div>
  )
}

export default Course