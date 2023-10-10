const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = 3001

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '123-321-1231'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '425-123-1234'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '905-175-4264'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '381-053-3953'
  }
]

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

let accessCount = 0
app.get('/api/persons', (req, res) => {
  accessCount += 1

  return res.json(persons)
})

app.get('/info', (req, res) => {
  const hour = new Date()

  res.send(
    `<h3>Phonebook has info for ${accessCount} people<h3/> <br/> <p>${hour}<p/>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const person = persons.find((person) => person.id === Number(id))

  if (!person) return res.status(404).end()

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const person = persons.filter((person) => person.id !== Number(id))

  if (!person) return res.status(404)

  res.json(person)
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  const person = persons.find((person) => person.name === name)

  if (!name || !number) return res.status(400).json({ error: 'data missing' })
  if (person) return res.status(400).json({ error: 'name must be unique' })

  const newPerson = {
    id: Math.round(Math.random() * 1000),
    name,
    number
  }

  persons = persons.concat(newPerson)

  res.json(persons)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server in Port: ${PORT}`)
})
