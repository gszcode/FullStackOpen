function Persons({ persons, handleDelete }) {
  return (
    <div>
      {persons.map((person) => (
        <>
          Name: <b key={person.name}>{person.name}</b>
          <br />
          Number: <b key={person.number}>{person.number}</b>
          <br />
          <button onClick={() => handleDelete(person.id)}>Delete</button>
          <hr />
        </>
      ))}
    </div>
  )
}

export default Persons
