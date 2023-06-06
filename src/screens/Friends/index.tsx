import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from 'styled-components/native'

import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

import { Button, Loading, Separator, Text, UserHeading } from '../../components'

import * as S from './styles'

export type Profile = {
  _id: string
  name: string
  user: string
  followers: string[]
  following: string[]
  createdAt: string
  updateAt: string
}

export function Friends() {
  const [loading, setLoading] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const theme = useTheme()
  const { user } = useAuth()

  const getUsers = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<Profile[]>('/profiles')
      setProfiles(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfUserIsFollowing = (profile: Profile) => {
    if (user?.profileId) {
      return profile.followers.includes(user?.profileId)
    }

    return false
  }

  const handleFollow = async (profileId: string) => {
    try {
      await api.post(`/profiles/${profileId}/follow`)
      getUsers()
    } catch (error) {
      console.log('Follow error', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredList = profiles.filter((item) => item._id !== user?.profileId)

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
            />
            <Separator size={16} />
            <Button
              text={checkIfUserIsFollowing(item) ? 'Seguindo' : 'Seguir'}
              small
              disabled={checkIfUserIsFollowing(item)}
              onPress={() => {
                handleFollow(item._id)
              }}
            />
          </>
        )}
        keyExtractor={({ _id }) => _id}
        ItemSeparatorComponent={() => <Separator size={24} />}
        ListEmptyComponent={() => (
          <>
            {!loading && (
              <Text>Ainda não existem outros usuários cadastrados</Text>
            )}
          </>
        )}
      />
    </S.Wrapper>
  )
}
