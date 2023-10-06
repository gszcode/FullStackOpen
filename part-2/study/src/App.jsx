import { useState } from 'react'
import './App.css'
import Course from './components/Course'
import Note from './components/Note'

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
function App({ notes }) {
  const [notesList, setNotesList] = useState(notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date().toISOString(),
      id: notesList.length + 1
    }

    setNotesList(notesList.concat(noteObject))
    setNewNote('')
  }

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const noteShow = showAll
    ? notesList
    : notesList.filter((note) => note.important)

  return (
    <div>
      {/* <h1>Web development curriculumn</h1> */}
      {/* <div>
        {course.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div> */}
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        {' '}
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {noteShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
