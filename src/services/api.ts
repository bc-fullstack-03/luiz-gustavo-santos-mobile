import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'http://192.168.2.100:4000/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('parrot:token')

    if (!token) {
      return config
    }

    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default api
