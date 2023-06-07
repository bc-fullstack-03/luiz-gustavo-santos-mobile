import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons//Ionicons'
import { formatDistance } from 'date-fns'
import ptBrLocale from 'date-fns/locale/pt-BR'
import { useTheme } from 'styled-components/native'

import { useAuth } from '../../context/AuthContext'

import api from '../../services/api'
import { Text } from '../Text'
import { Separator } from '../Separator'
import { Post } from '../../screens'

import * as S from './styles'

type FeedItemProps = {
  post: Post
}

export const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  const { user } = useAuth()
  const theme = useTheme()

  const [liked, setLiked] = useState(() => {
    if (user?.profileId) {
      return post.likes.includes(user.profileId)
    }
    return false
  })

  const handleLike = async (postId: string) => {
    try {
      if (liked) {
        await api.post(`/posts/${postId}/unlike`)
      } else {
        await api.post(`/posts/${postId}/like`)
      }

      setLiked((prev) => !prev)
    } catch (error) {
      console.log('Like post', error)
    }
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.Box>
          <Ionicons name="person-circle-outline" size={24} color="#FFF" />
          <S.BoxName>
            <Text size="large">{post.profile.name}</Text>
            <S.SmallText>
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
                locale: ptBrLocale
              })}
            </S.SmallText>
          </S.BoxName>
        </S.Box>

        <Ionicons name="trash-outline" size={20} color="#FFF" />
      </S.Header>

      <Separator size={16} />
      <Text>{post.title}</Text>
      <Separator size={16} />

      {post.image ? (
        <S.ImageStyled source={{ uri: post.description }} resizeMode="cover" />
      ) : (
        <Text>{post.description}</Text>
      )}
      <Separator size={16} />

      <S.Footer>
        <TouchableOpacity onPress={() => handleLike(post._id)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? theme.colors.warning : theme.colors.gray100}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbox-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </S.Footer>
    </S.Wrapper>
  )
}
