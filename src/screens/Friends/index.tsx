import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTheme } from 'styled-components/native'

import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

import { Button, Loading, Separator, Text, UserHeading } from '../../components'
import { BottomStackParamList } from '../../routes/types'

import * as S from './styles'

export type User = {
  id: string
  name: string
  email: string
  photoUrl: string | undefined
  followers: string[]
  following: string[]
}

type Props = NativeStackScreenProps<BottomStackParamList, 'Friends'>

export function Friends({ navigation }: Props) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const theme = useTheme()
  const { userId } = useAuth()

  const getUsers = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<User[]>('/user/all')
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfUserIsFollowing = (user: User) => {
    if (userId) {
      return user.followers.includes(userId)
    }

    return false
  }

  const handleFollow = async (userId: string) => {
    try {
      await api.post(`/user/follow/${userId}`)
      getUsers()
    } catch (error) {
      console.log('Follow error', error)
    }
  }

  const handleUnFollow = async (userId: string) => {
    try {
      await api.delete(`/user/unfollow/${userId}`)
      getUsers()
    } catch (error) {
      console.log('UnFollow error', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredList = users.filter((item) => item.id !== userId)

  return (
    <S.Wrapper>
      {loading && <Loading color={theme.colors.primary} size="large" />}
      <FlatList
        data={filteredList}
        renderItem={({ item }) => (
          <>
            <UserHeading
              username={item.name}
              totalFollowers={item.followers.length ?? 0}
              totalFollowing={item.following.length ?? 0}
              handleNavigation={() =>
                navigation.navigate('Profile', {
                  userId: item.id
                })
              }
            />
            <Separator size={16} />
            <Button
              text={
                checkIfUserIsFollowing(item) ? 'Deixar de seguir' : 'Seguir'
              }
              small
              onPress={() => {
                if (checkIfUserIsFollowing(item)) {
                  handleUnFollow(item.id)
                } else {
                  handleFollow(item.id)
                }
              }}
            />
          </>
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <Separator size={24} />}
        ListEmptyComponent={() => (
          <Text>Ainda não existem outros usuários cadastrados</Text>
        )}
      />
    </S.Wrapper>
  )
}
