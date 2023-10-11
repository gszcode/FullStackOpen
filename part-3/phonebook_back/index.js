require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = 3001
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

let accessCount = 0
app.get('/api/persons', (req, res) => {
  accessCount += 1

  Person.find({}).then((person) => {
    res.json(person)
  })
})

app.get('/info', (req, res) => {
  const hour = new Date()

  res.send(
    `<h3>Phonebook has info for ${accessCount} people<h3/> <br/> <p>${hour}<p/>`
  )
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndRemove(id)
    .then((person) => {
      if (person) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'person doesnt exist' })
      }
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).json({ error: 'data missing' })

  const newPerson = new Person({
    name,
    number
  })

  newPerson
    .save()
    .then((result) => result.toJSON())
    .then((personSaved) => res.json(personSaved))
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  const newPerson = {
    name,
    number
  }

  Person.findByIdAndUpdate(
    id,
    newPerson,
    { new: true },
    { runValidators: true }
  )
    .then((person) => {
      if (person) {
        res.status(200).json(person)
      }
    })
    .catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const handleError = require('./middlewares/handleError')
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server in Port: ${PORT}`)
})
