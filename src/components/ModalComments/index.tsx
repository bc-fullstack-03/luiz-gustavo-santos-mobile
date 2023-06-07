import { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import api from '../../services/api'
import { Comment, CommentData } from '../Comment'
import { ModalBase } from '../Modal'
import { Loading } from '../Loading'
import { Separator } from '../Separator'

import * as S from './styles'
import { useAuth } from '../../context/AuthContext'

type ModalCommentsProps = {
  postId: string | null
  open: boolean
  onClose: () => void
}

export const ModalComments: React.FC<ModalCommentsProps> = ({
  postId,
  onClose,
  open
}) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')

  const theme = useTheme()
  const { user } = useAuth()

  const getComments = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<CommentData[]>(`/posts/${postId}/comments`)

      setComments(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (comment: CommentData) => {
    try {
      await api.delete(`/posts/${comment.post}/comments/${comment._id}/`)
      await getComments()
    } catch (error) {
      console.log('Delete comment', error)
    }
  }

  const handleAddComment = async () => {
    try {
      if (!comment) {
        return
      }
      await api.post(`/posts/${postId}/comments`, {
        description: comment,
        profile: user?.profileId
      })

      await getComments()
    } catch (error) {
      console.log('Add comment', error)
    } finally {
      setComment('')
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (postId) {
        getComments()
      }
    }, [postId])
  )

  return (
    <ModalBase
      transparent
      title="Comentários"
      visible={open}
      onClose={onClose}
      onRequestClose={onClose}
    >
      <S.Wrapper>
        {loading && <Loading />}
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment
              comment={item}
              handleDelete={() => handleDeleteComment(item)}
            />
          )}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Separator size={16} />}
        />

        <S.Form>
          <S.TextField
            placeholder="Seu comentário"
            placeholderTextColor={theme.colors.gray500}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Ionicons
              size={48}
              color={theme.colors.primary}
              name="send-outline"
            />
          </TouchableOpacity>
        </S.Form>
      </S.Wrapper>
    </ModalBase>
  )
}
