import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

import { Text } from '../Text'
import { Separator } from '../Separator'
import { Profile } from '../../screens/Friends'

import * as S from './styles'

export type CommentData = {
  _id: string
  description: string
  post: string
  likes: string[]
  createdAt: string
  updateAt: string
  profile: Profile
}

type CommentProps = {
  comment: CommentData
  handleDelete: () => void
}

export const Comment: React.FC<CommentProps> = ({ comment, handleDelete }) => {
  const { user } = useAuth()
  const theme = useTheme()

  const [liked, setLiked] = useState(() => {
    if (user?.profileId) {
      return comment.likes.includes(user.profileId)
    }
    return false
  })

  const handleLike = async (commentId: string) => {
    try {
      if (liked) {
        await api.post(`/posts/${comment.post}/comments/${commentId}/unlike`)
      } else {
        await api.post(`/posts/${comment.post}/comments/${commentId}/like`)
      }

      setLiked((prev) => !prev)
    } catch (error) {
      console.log('Like comment', error)
    }
  }

  return (
    <S.Wrapper>
      <S.Box>
        <Text bold>{comment.profile.name}</Text>
        {user?.profileId === comment.profile._id && (
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        )}
      </S.Box>
      <Separator size={8} />
      <Text size="small">{comment.description}</Text>
      <Separator size={8} />

      <TouchableOpacity onPress={() => handleLike(comment._id)}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          color={liked ? theme.colors.warning : theme.colors.gray100}
          size={20}
        />
      </TouchableOpacity>
    </S.Wrapper>
  )
}
