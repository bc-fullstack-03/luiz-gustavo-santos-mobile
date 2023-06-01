import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { useAuth } from '../context/AuthContext'

export const Routes = () => {
  const { token, userId } = useAuth()
  return (
    <NavigationContainer>
      {token && userId ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
