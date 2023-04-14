import { useState } from 'react'

const Heading = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateFeedback = (value) => {
    let updatedTotal
    if (value == 1) {
      const updatedGood = good + 1
      updatedTotal = updatedGood + neutral + bad
      setGood(updatedGood)
      setAverage((updatedGood-bad)/updatedTotal)
      setPositive(updatedGood/updatedTotal)
    } else if (value == 0) {
      const updatedNeutral = neutral + 1
      updatedTotal = good + updatedNeutral + bad
      setNeutral(neutral + 1)
      setAverage((good-bad)/updatedTotal)
      setPositive(good/updatedTotal)
    } else if (value == -1) {
      const updatedBad = bad + 1
      updatedTotal = good + neutral + updatedBad
      setBad(bad + 1)
      setAverage((good-updatedBad)/updatedTotal)
      setPositive(good/updatedTotal)
    }
    console.log(total)
    setTotal(updatedTotal)
    console.log(total)
    console.log('average: ', average)
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={() => updateFeedback(1)} text="good" />
      <Button handleClick={() => updateFeedback(0)} text="neutral" />
      <Button handleClick={() => updateFeedback(-1)} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App
