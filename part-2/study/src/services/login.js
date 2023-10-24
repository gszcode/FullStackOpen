import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  const data = await response.data

  return data
}

export default login
