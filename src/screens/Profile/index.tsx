import { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import { Avatar, Loading, Separator, Text } from '../../components'
import { BottomStackParamList } from '../../routes/types'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import { User } from '../Friends'

import * as S from './styles'

export function Profile() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const { userId: loggedUserId } = useAuth()
  const route = useRoute<RouteProp<BottomStackParamList>>()
  const theme = useTheme()

  const getUser = async () => {
    try {
      setLoading(true)
      const userId = route.params?.userId || loggedUserId
      const { data } = await api.get<User>(`/user/${userId}`)

      setUser(data)
    } catch (error) {
      console.log('GET_USER_ERROR', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <S.Wrapper>
      {loading && <Loading color={theme.colors.primary} />}
      <Avatar />
      <Separator size={24} />
      <Text size="large">{user?.name}</Text>
      <S.FollowerContent>
        <Text size="xsmall">{user?.followers.length ?? 0} Seguidores</Text>
        <Text size="xsmall">|</Text>
        <Text size="xsmall">Seguindo {user?.following.length ?? 0}</Text>
      </S.FollowerContent>
      <S.ButtonsContainer>
        <S.Button>
          <Ionicons
            name="pencil-outline"
            size={16}
            color={theme.colors.white}
          />
          <Text size="small">Editar dados</Text>
        </S.Button>
        <Text size="xsmall">|</Text>
        <S.Button>
          <Ionicons
            name="trash-outline"
            size={16}
            color={theme.colors.warning}
          />
          <Text size="small" color={theme.colors.warning}>
            Excluir conta
          </Text>
        </S.Button>
      </S.ButtonsContainer>
    </S.Wrapper>
  )
}
