import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'

import { AuthProvider } from './src/context/AuthContext'
import { Routes } from './src/routes'

import theme from './src/styles/theme'

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" translucent />
          <Routes />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
