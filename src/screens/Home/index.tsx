import { useState, useEffect } from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'

import { usePost } from '../../context/Post'
import {
  FeedItem,
  Loading,
  ModalComments,
  ModalCreatePost,
  Text
} from '../../components'

import type { Profile } from '../Friends'

import * as S from './styles'

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
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [page, setPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [postId, setPostId] = useState<string | null>(null)

  const { getPosts, closeModalCreatePost, modalCreatePostVisible, deletePost } =
    usePost()

  const loadFeed = async () => {
    try {
      setLoading(true)
      const data = await getPosts(page)

      setPosts(data)
    } catch (error) {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const loadMoreItems = async () => {
    const newPage = page + 1
    const data = await getPosts(newPage)
    setPosts([...posts, ...data])

    setPage(newPage)
  }

  const handleOpenComments = (id: string) => {
    setModalOpen(true)
    setPostId(id)
  }

  const handleCloseComments = () => {
    setModalOpen(false)
    setPostId(null)
  }

  const onRefresh = async () => {
    try {
      setIsRefreshing(true)
      const data = await getPosts(0)

      setPosts(data)
    } catch (error) {
      console.log('OnRefresh error', error)
    } finally {
      setPage(0)
      setIsRefreshing(false)
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
            onRefresh()
          })
      }
    ])
  }

  useEffect(() => {
    loadFeed()
  }, [])

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
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
      />
      <ModalComments
        open={modalOpen}
        onClose={handleCloseComments}
        postId={postId}
      />
      <ModalCreatePost
        onClose={closeModalCreatePost}
        open={modalCreatePostVisible}
        onRefreshFeed={onRefresh}
      />
    </S.Wrapper>
  )
}
