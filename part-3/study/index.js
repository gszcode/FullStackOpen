const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  if (!note) res.status(404).end()

  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.filter((note) => note.id !== id)

  if (!note) res.status(404).end()

  res.json(204).end()
})

const generateId = () => {
  const maxId = notes.length ? Math.max(...notes.map((note) => note.id)) : 0

  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const { content, important } = req.body

  if (!content) return res.status(400).json({ error: 'content missing' })

  const note = {
    id: generateId(),
    content,
    important: important || false,
    date: new Date()
  }

  notes = [...notes, note]

  res.status(200).json(notes)
})

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
