import { useState } from 'react'
import './App.css'
import Statistics from './components/Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setBad={setBad}
        setNeutral={setNeutral}
      />
    </>
  )
}

export default App
