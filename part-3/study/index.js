const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001
const Note = require('./models/note')
const handleError = require('./middlewares/handleError')

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((note) => {
    response.json(note)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then((note) => {
      if (note) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'note does not exist' })
      }
    })
    .catch((err) => next(err))
})

app.post('/api/notes', (req, res, next) => {
  const { content, important } = req.body

  // if (!content || !important)
  //   return res.status(400).json({ error: 'data missing' })

  const note = new Note({
    content,
    important,
    date: new Date()
  })

  note
    .save()
    .then((result) => result.toJSON())
    .then((noteSaved) => res.json(noteSaved))
    .catch((err) => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  const newNote = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, newNote, { new: true })
    .then((note) => {
      res.json(note)
    })
    .catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
