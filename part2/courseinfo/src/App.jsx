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

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>      
    </div>
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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <>
          {courses.map(course => 
        <li key={course.id}>
          <Course course={course}/>
        </li>
      )}
  </>
}

export default App