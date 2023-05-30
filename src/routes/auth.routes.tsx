import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'

import { Login, Register } from '../screens'

const { Navigator, Screen } = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  headerShown: false
}

export const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={screenOptions}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  )
}
