import { useState, useEffect } from 'react'
import { Alert, FlatList } from 'react-native'

import {
  FeedItem,
  Loading,
  ModalComments,
  ModalCreatePost,
  Text
} from '../../components'

import { Profile } from '../Friends'

import * as S from './styles'
import { usePost } from '../../context/Post'

export type Post = {
  _id: string
  title: string
  description: string
  image: boolean
  comments: string[]
  likes: string[]
  profile: Profile
  createdAt: string
  updateAt: string
}

export function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [postId, setPostId] = useState<string | null>(null)

  const { getPosts, closeModalCreatePost, modalCreatePostVisible, deletePost } =
    usePost()

  const loadFeed = async () => {
    try {
      setLoading(true)
      const data = await getPosts(page)

      setPosts([...posts, ...data])
    } catch (error) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const loadMoreItems = () => {
    setPage(page + 1)
  }

  const handleOpenComments = (id: string) => {
    setModalOpen(true)
    setPostId(id)
  }

  const handleClose = () => {
    setModalOpen(false)
    setPostId(null)
  }

  const onRefresh = async () => {
    try {
      setLoading(true)
      const data = await getPosts(0)

      setPosts(data)
    } catch (error) {
      setPosts([])
    } finally {
      setPage(0)
      setLoading(false)
    }
  }

  const handleDeletePost = (postId: string) => {
    Alert.alert('Deseja deletar este post?', '', [
      {
        text: 'Cancelar'
      },
      {
        text: 'Confirmar',
        onPress: () =>
          deletePost(postId).then(() => {
            const newPosts = posts.filter((item) => item._id !== postId)
            setPosts(newPosts)
          })
      }
    ])
  }

  useEffect(() => {
    loadFeed()
  }, [page])

  return (
    <S.Wrapper>
      {loading && <Loading />}
      {!posts.length && <Text>Nenhum post por aqui.</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FeedItem
            post={item}
            handleOpenComments={() => handleOpenComments(item._id)}
            handleDelete={() => handleDeletePost(item._id)}
          />
        )}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
      />
      <ModalComments open={modalOpen} onClose={handleClose} postId={postId} />
      <ModalCreatePost
        onClose={closeModalCreatePost}
        open={modalCreatePostVisible}
        onRefreshFeed={onRefresh}
      />
    </S.Wrapper>
  )
}
