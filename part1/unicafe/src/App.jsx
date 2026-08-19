import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
  }
    const handleBad = () => {
      const updatedBad = bad + 1;
      setBad(updatedBad)
      setTotal(good + updatedBad + neutral)
  }
    const handleNeutral = () => {
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>All {total} </p>
      <p>average {(good+neutral*0+bad*-1)/total}</p>
      <p>postive {good*100/total}%</p>
    </div>
  )
}

export default App