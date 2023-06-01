import { View, Text } from 'react-native'

import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components'

export function Home() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <View>
      <Text>Home</Text>
      <Button text="Sair" onPress={handleLogout} />
    </View>
  )
}
