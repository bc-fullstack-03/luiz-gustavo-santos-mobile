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
  user: LoggedUser | null
}

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

type LoggedUser = {
  profileId: string
  name: string
  userId: string
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<LoggedUser | null>(null)

  useEffect(() => {
    const getStorageData = async () => {
      const storageToken = await AsyncStorage.getItem('parrot:token')
      const storageUser = await AsyncStorage.getItem('parrot:user')

      if (storageToken && storageUser) {
        setToken(storageToken)
        setUser(JSON.parse(storageUser) as LoggedUser)
      }
    }

    getStorageData()
  }, [])

  const getUser = useCallback(async (token: string): Promise<LoggedUser> => {
    const { data } = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return {
      name: data.profile.name,
      profileId: data.profile._id,
      userId: data.profile.user
    }
  }, [])

  const login = useCallback(async (body: LoginBody) => {
    try {
      const { data } = await api.post<LoginResponse>('/security/login', {
        user: body.email,
        password: body.password
      })

      if (data.accessToken) {
        const loggedUser = await getUser(data.accessToken)
        await AsyncStorage.setItem('parrot:token', data.accessToken)
        await AsyncStorage.setItem('parrot:user', JSON.stringify(loggedUser))
        setToken(data.accessToken)
        setUser(loggedUser)
        Toast.show({
          type: 'success',
          text1: 'Login com sucesso'
        })
      }
    } catch (error) {
      console.log('Auth error', error)
      throw new Error('Ocorreu um erro ao fazer o login')
    }
  }, [])

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('parrot:token')
    await AsyncStorage.removeItem('parrot:user')
    setUser(null)
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with AuthProvider')
  }

  return context
}
