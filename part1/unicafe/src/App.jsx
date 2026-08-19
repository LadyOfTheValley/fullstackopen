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
        <StatisticLine text="good " value={props.good} />
        <StatisticLine text="neutral " value={props.neutral} />
        <StatisticLine text="bad " value={props.bad} />
        <StatisticLine text="total " value={props.total} />
        <StatisticLine text="average " value={(props.good+props.neutral*0+props.bad*-1)/props.total} />
        <StatisticLine text="positive " value={`${props.good*100/props.total}%`}/>
    </div>    
  )    
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.action}>{props.text}</button>
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
        <Button text="good" action={handleGood} />
        <Button text="neutral" action={handleNeutral} />
        <Button text="bad" action={handleBad} />
        <h1>Statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} total={total} allClicks={allClicks} />
    </div>
  )
}

export default App