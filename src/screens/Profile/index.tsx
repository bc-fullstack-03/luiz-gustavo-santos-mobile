import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import api from '../../services/api'

import {
  Avatar,
  Loading,
  ModalUpdateUser,
  Separator,
  Text
} from '../../components'
import { useAuth } from '../../context/AuthContext'
import type { Profile } from '../Friends'

import * as S from './styles'
import { Alert } from 'react-native'

type FullProfile = {
  _id: string
  name: string
  user: string
  followers: Profile[]
  following: Profile[]
  createdAt: string
  updateAt: string
}

export function Profile() {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<FullProfile>()
  const theme = useTheme()

  const { user, logout } = useAuth()

  const handleDeleteProfile = () => {
    Alert.alert(
      'Deseja deletar sua conta?',
      'Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            api
              .delete('/users/me')
              .then(() => {
                logout()
              })
              .catch((error) => {
                console.log('Delete Profile', error)
              })
          }
        }
      ]
    )
  }

  const getUser = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<FullProfile>(
        `/profiles/${user?.profileId}`
      )

      setProfile(data)
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
    <>
      <S.Wrapper>
        {loading && <Loading color={theme.colors.primary} />}
        <Avatar />
        <Separator size={24} />
        <Text size="large">{profile?.name}</Text>
        <S.FollowerContent>
          <Text size="xsmall">{profile?.followers.length ?? 0} Seguidores</Text>
          <Text size="xsmall">|</Text>
          <Text size="xsmall">Seguindo {profile?.following.length ?? 0}</Text>
        </S.FollowerContent>

        <S.ButtonsContainer>
          <S.Button onPress={() => setModalVisible(true)}>
            <Ionicons
              name="pencil-outline"
              size={16}
              color={theme.colors.white}
            />
            <Text size="small">Editar dados</Text>
          </S.Button>
          <Text size="xsmall">|</Text>
          <S.Button onPress={handleDeleteProfile}>
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
      <ModalUpdateUser
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  )
}
