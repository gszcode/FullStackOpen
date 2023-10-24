import { useState } from 'react'
import './App.css'
import Note from './components/Note'
import { useEffect } from 'react'
import services from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'

// const course = [
//   {
//     name: 'Half Stack application development',
//     id: 1,
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       },
//       {
//         name: 'Redux',
//         exercises: 11,
//         id: 4
//       }
//     ]
//   },
//   {
//     name: 'Node.js',
//     id: 2,
//     parts: [
//       {
//         name: 'Routing',
//         exercises: 3,
//         id: 1
//       },
//       {
//         name: 'Middlewares',
//         exercises: 7,
//         id: 2
//       }
//     ]
//   }
// ]

// eslint-disable-next-line react/prop-types
function App() {
  const [notesList, setNotesList] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    services.getAll().then((state) => setNotesList(state))
  }, [])

  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])

  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date()
    }

    services.create(noteObject).then((state) => setNotesList(state))
    setNewNote('')
  }

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const noteShow = showAll
    ? notesList
    : notesList.filter((note) => note.important)

  const toggleImportance = (id) => {
    const note = notesList.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    services
      .update(id, changedNote)
      .then((state) => {
        setNotesList(notesList.map((note) => (note.id !== id ? note : state)))
      })
      .catch((err) => {
        alert(`the note ${note.content} was already deleted from server`)
        setNotesList(notesList.filter((n) => n.id !== id))
      })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({ username, password })
      localStorage.setItem('loggedNoteappUser', JSON.stringify(user.token))

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input type="text" onChange={handleChange} value={newNote} />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      {/* <h1>Web development curriculumn</h1> */}
      {/* <div>
        {course.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div> */}
      <h1>Notes</h1>

      {/* <Notification message={errorMessage} /> */}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          {noteForm()}
        </div>
      )}

      <button onClick={() => setShowAll(!showAll)}>
        {' '}
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {noteShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
