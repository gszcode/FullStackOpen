import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }, [])

  const handleFilter = (e) => {
    setSearch(e.target.value)
  }

  const filter = countries.filter((countrie) =>
    countrie.name.official.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <p>Find countries:</p> <input value={search} onChange={handleFilter} />
      <ul>
        {search && filter.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filter.length > 1 &&
          filter.map((c) => <li key={c.name.official}>{c.name.official}</li>)
        )}
        {filter.length === 1 &&
          filter.map((c) => (
            <>
              <h2>{c.name.official}</h2>
              <p>Capital: {c.capital}</p>
              <p>Population: {c.population}</p>
              <h3>Languages</h3>
              <img src={c.flags.png} />
            </>
          ))}
      </ul>
    </div>
  )
}

export default App
