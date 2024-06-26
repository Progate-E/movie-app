import { ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlashList } from '@shopify/flash-list'
import React, { ReactElement } from 'react'
import { Text } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import useMovies, { FetchType } from '../hooks/useMovies'

interface AllMoviesProps {
  fetchType: FetchType
  movieId: number
}

export default function AllMovies({
  route,
}: NativeStackScreenProps<ParamListBase>): ReactElement {
  const { movieId, fetchType } = route.params as AllMoviesProps
  const { data, isFetching, fetchNextPage, error, isError } = useMovies(
    fetchType,
    movieId,
  )

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