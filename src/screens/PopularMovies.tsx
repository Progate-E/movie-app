import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { Text } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import useMovies from '../hooks/useMovies'

export default function PopularMovies(): React.ReactElement {
  const { data, isFetching, fetchNextPage, error, isError } =
    useMovies('popular')

  return isError ? (
    <Text>Error: {error?.message}</Text>
  ) : (
    <FlashList
      data={data?.pages.flatMap((page) => page.results)}
      renderItem={({ item }) => <MovieCard width="100%" landscape {...item} />}
      onEndReached={fetchNextPage}
      refreshing={isFetching}
      onRefresh={fetchNextPage}
      keyExtractor={(item, i) => `${i}-${item.id}`}
      estimatedItemSize={175}
      onEndReachedThreshold={0.3}
    />
  )
}
