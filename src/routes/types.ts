import { NavigatorScreenParams } from '@react-navigation/native'

export type BottomStackParamList = {
  Feed: undefined
  Profile: undefined
  Friends: undefined
}

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
  Home: NavigatorScreenParams<BottomStackParamList>
}
