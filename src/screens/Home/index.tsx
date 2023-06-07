import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import api from '../../services/api'
import { FeedItem, Loading } from '../../components'

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
        renderItem={({ item }) => <FeedItem post={item} />}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.3}
      />
    </S.Wrapper>
  )
}
