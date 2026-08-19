import { useState } from 'react'

const Statistics = (props) => {
  if (props.allClicks.length === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
  return(
    <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>All {props.total} </p>
        <p>average {(props.good+props.neutral*0+props.bad*-1)/props.total}</p>
        <p>postive {props.good*100/props.total}%</p>
    </div>    
  )    
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGood = () => {
    setAll(allClicks.concat('G'))
    const updatedGood = good + 1;
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
  }
    const handleBad = () => {
      setAll(allClicks.concat('B'))
      const updatedBad = bad + 1;
      setBad(updatedBad)
      setTotal(good + updatedBad + neutral)
  }
    const handleNeutral = () => {
      setAll(allClicks.concat('N'))
      const updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral)
      setTotal(good + bad + updatedNeutral)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} allClicks={allClicks} />
    </div>
  )
}

export default App