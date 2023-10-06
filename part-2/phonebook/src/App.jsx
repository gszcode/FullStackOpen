import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'

const initialState = {
  name: '',
  phone: ''
}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState(initialState)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const findPerson = persons.find((person) => person.name === newName.name)
    if (findPerson)
      return alert(`${newName.name} is already added to phonebook`)

    setPersons([...persons, newName])
    setNewName(initialState)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setNewName({
      ...newName,
      [name]: value
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        newName={newName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
