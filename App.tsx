import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'
import Toast from 'react-native-toast-message'

import { AuthProvider } from './src/context/AuthContext'
import { Routes } from './src/routes'

import theme from './src/styles/theme'
import { PostProvider } from './src/context/Post'

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PostProvider>
          <ThemeProvider theme={theme}>
            <StatusBar style="light" translucent />
            <Routes />
            <Toast />
          </ThemeProvider>
        </PostProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
