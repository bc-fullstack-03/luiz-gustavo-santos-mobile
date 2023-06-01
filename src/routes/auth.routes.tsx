import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'

import { Login, Register } from '../screens'
import { AppRoutes } from './app.routes'
import { AuthStackParamList } from './types'

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerShown: false
}

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="Home" component={AppRoutes} />
    </Navigator>
  )
}
