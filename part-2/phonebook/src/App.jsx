import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Persons from './components/Persons'
import services from './services/phone'

const initialState = {
  name: '',
  number: ''
}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState(initialState)

  useEffect(() => {
    services.getAll().then((state) => setPersons(state))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const findPerson = persons.find((person) => person.name === newName.name)
    if (findPerson)
      return alert(`${newName.name} is already added to phonebook`)

    services.create(newName).then((state) => setPersons([...persons, state]))
    setNewName(initialState)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setNewName({
      ...newName,
      [name]: value
    })
  }

  const handleDelete = (id) => {
    const findPerson = persons.find((person) => person.id === id)
    const confirm = window.confirm(`Delete ${findPerson.name} ?`)

    if (confirm) {
      services.deletePerson(findPerson.id)
      const newPersons = persons.filter((person) => person.id !== id)
      setPersons(newPersons)
    }
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
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
