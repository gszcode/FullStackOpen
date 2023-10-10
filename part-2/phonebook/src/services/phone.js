import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const getAll = async () => {
  const request = await axios.get(url)
  const res = await request
  return res.data
}

const create = async (newPerson) => {
  const request = await axios.post(url, newPerson)
  const res = await request
  return res.data
}

const deletePerson = async (id) => {
  const request = await axios.delete(`${url}/${id}`)
  const res = await request
  return res
}

export default {
  getAll,
  create,
  deletePerson
}
