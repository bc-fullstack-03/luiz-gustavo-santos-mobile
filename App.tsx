import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'

import theme from './src/styles/theme'

import { AuthRoutes } from './src/routes/auth.routes'

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        <AuthRoutes />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
