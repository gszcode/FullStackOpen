function Form({ newName, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a nwe</h2>
      <div>
        name: <input name="name" value={newName.name} onChange={handleChange} />
        <br />
        number:{' '}
        <input name="number" value={newName.number} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form
