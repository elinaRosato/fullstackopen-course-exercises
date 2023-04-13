import { useState } from 'react'

const Heading = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood(good + 1)
  const updateNeutral = () => setNeutral(neutral + 1)
  const updateBad = () => setBad(bad + 1)

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={updateGood} text="good" />
      <Button handleClick={updateNeutral} text="neutral" />
      <Button handleClick={updateBad} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
