import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useEffect
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

import api from '../services/api'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextProps = {
  login: (data: LoginBody) => Promise<void>
  logout: () => Promise<void>
  token: string | null
  userId: string | null
}

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  id: string
  token: string
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getStorageData = async () => {
      const storageToken = await AsyncStorage.getItem('parrot:token')
      const storageUserId = await AsyncStorage.getItem('parrot:userId')

      if (storageToken && storageUserId) {
        setToken(storageToken)
        setUserId(storageUserId)
      }
    }

    getStorageData()
  }, [])

  const login = useCallback(async (body: LoginBody) => {
    const { data } = await api.post<LoginResponse>(
      '/authentication/login',
      body
    )

    await AsyncStorage.setItem('parrot:token', data.token)
    await AsyncStorage.setItem('parrot:userId', data.id)
    setToken(data.token)
    setUserId(data.id)
    Toast.show({
      type: 'success',
      text1: 'Login com sucesso'
    })
  }, [])

  const logout = useCallback(async () => {
    await AsyncStorage.clear()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must have used with AuthProvider')
  }

  return context
}
