import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.2.100:8082/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default api
