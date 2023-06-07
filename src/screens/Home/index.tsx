import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import api from '../../services/api'
import { FeedItem, Loading, ModalComments } from '../../components'

import { Profile } from '../Friends'

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
  const [page, setPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [postId, setPostId] = useState<string | null>(null)

  const loadFeed = async () => {
    try {
      setLoading(true)
      const { data } = await api.get<Post[]>('feed', {
        params: {
          page
        }
      })

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

  useEffect(() => {
    loadFeed()
  }, [page])

  return (
    <S.Wrapper>
      {loading && <Loading />}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FeedItem
            post={item}
            handleOpenComments={() => handleOpenComments(item._id)}
          />
        )}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.3}
      />
      <ModalComments open={modalOpen} onClose={handleClose} postId={postId} />
    </S.Wrapper>
  )
}
