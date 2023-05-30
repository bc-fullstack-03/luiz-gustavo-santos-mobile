import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import { Button } from './src/components'
import theme from './src/styles/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Text>Parrot App</Text>
      <Button />
    </ThemeProvider>
  )
}
