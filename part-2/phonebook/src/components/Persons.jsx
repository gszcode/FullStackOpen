function Persons({ persons }) {
  return (
    <div>
      {persons.map((person) => (
        <>
          Name: <b key={person.name}>{person.name}</b>
          <br />
          Phone: <b key={person.name}>{person.phone}</b>
          <hr />
        </>
      ))}
    </div>
  )
}

export default Persons
