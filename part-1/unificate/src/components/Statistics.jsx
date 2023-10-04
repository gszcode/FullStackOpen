import StatisticLine from './StatisticLine '

function Statistics({ good, bad, neutral, setNeutral, setGood, setBad }) {
  const all = good + bad + neutral

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setBad(bad + 1)}>Neutral</button>
      <button onClick={() => setNeutral(neutral + 1)}>Bad</button>
      <button
        onClick={() => {
          setGood(0), setBad(0), setNeutral(0)
        }}
      >
        Reset
      </button>
      <h4>Statistics</h4>

      {good | neutral | bad ? (
        <>
          <StatisticLine text="Good" value={good} /> <br />
          <StatisticLine text="Bad" value={bad} /> <br />
          <StatisticLine text="Neutral" value={neutral} /> <br />
          <StatisticLine text="Average" value={(good - bad) / all} /> <br />
          <StatisticLine text="Neutral" value={`${all && good / all}%`} />
        </>
      ) : (
        'No Feedback given'
      )}
    </div>
  )
}

export default Statistics
