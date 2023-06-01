import { Text } from 'react-native'

import { useAuth } from '../../context/AuthContext'
import { Button, Container } from '../../components'

export function Home() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Container>
      <Text>Home</Text>
      <Button text="Sair" onPress={handleLogout} />
    </Container>
  )
}
