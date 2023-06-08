import { createContext, useCallback, useContext, useState } from 'react'
import Toast from 'react-native-toast-message'

import api from '../services/api'
import { Post } from '../screens'

type PostContextData = {
  modalCreatePostVisible: boolean
  openModalCreatePost: () => void
  closeModalCreatePost: () => void
  getPosts: (page?: number) => Promise<Post[]>
  createPost: (formData: FormData) => Promise<void>
  deletePost: (postId: string) => Promise<void>
}

type PostProviderProps = {
  children: React.ReactNode
}

export const PostContext = createContext<PostContextData>({} as PostContextData)

export const PostProvider = ({ children }: PostProviderProps) => {
  const [modalCreatePostVisible, setModalCreatePostVisible] = useState(false)

  const openModalCreatePost = useCallback(() => {
    setModalCreatePostVisible(true)
  }, [])

  const closeModalCreatePost = useCallback(() => {
    setModalCreatePostVisible(false)
  }, [])

  const getPosts = useCallback(async (page = 0) => {
    const { data } = await api.get<Post[]>('feed', {
      params: {
        page
      }
    })

    return data
  }, [])

  const createPost = useCallback(async (formData: FormData) => {
    try {
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Toast.show({
        text1: 'Post criado com sucesso',
        type: 'success'
      })
    } catch (error) {
      Toast.show({
        text1: 'Ocorreu um erro ao criar o post',
        type: 'error'
      })
    }
  }, [])

  const deletePost = useCallback(async (postId: string) => {
    try {
      await api.delete(`/posts/${postId}`)
    } catch (error) {
      Toast.show({
        text1: 'Ocorreu um erro ao deletar o post',
        type: 'error'
      })
    }
  }, [])

  return (
    <PostContext.Provider
      value={{
        closeModalCreatePost,
        createPost,
        getPosts,
        modalCreatePostVisible,
        openModalCreatePost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error('useAuth must be used with PostProvider')
  }

  return context
}
