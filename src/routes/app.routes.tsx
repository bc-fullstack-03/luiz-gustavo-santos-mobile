import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Friends, Home, Profile } from '../screens'
import { BottomStackParamList } from './types'

const { Navigator, Screen } = createBottomTabNavigator<BottomStackParamList>()

export const AppRoutes = () => {
  return (
    <Navigator>
      <Screen name="Feed" component={Home} />
      <Screen name="Friends" component={Friends} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  )
}
