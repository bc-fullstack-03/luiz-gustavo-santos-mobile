import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import { Friends, Home, Profile } from '../screens'
import { BottomStackParamList } from './types'
import { Pressable } from 'react-native'
import { usePost } from '../context/Post'

const { Navigator, Screen } = createBottomTabNavigator<BottomStackParamList>()

export const AppRoutes = () => {
  const theme = useTheme()
  const { openModalCreatePost } = usePost()
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: theme.colors.mainBg
        },
        headerRightContainerStyle: {
          marginRight: 16
        },
        headerTintColor: theme.colors.white,
        tabBarStyle: {
          backgroundColor: theme.colors.gray900
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray100
      }}
    >
      <Screen
        name="Feed"
        component={Home}
        options={{
          headerTitle: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <Pressable onPress={openModalCreatePost}>
              <Ionicons name="pencil-outline" size={24} color={tintColor} />
            </Pressable>
          )
        }}
      />
      <Screen
        name="Friends"
        component={Friends}
        options={{
          headerTitle: 'Amigos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </Navigator>
  )
}
