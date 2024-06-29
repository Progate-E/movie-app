import {
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlashList } from '@shopify/flash-list'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import useMovies, { FetchType } from '../hooks/useMovies'

interface AllMoviesProps {
  fetchType: FetchType
  movieId: number
  params: Record<string, string>
}

export default function AllMovies({
  route,
}: NativeStackScreenProps<ParamListBase>): ReactElement {
  const navigation = useNavigation()
  const { movieId, fetchType, params } = route.params as AllMoviesProps
  const { data, isFetching, fetchNextPage, error, isError } = useMovies(
    fetchType,
    movieId,
    params,
  )

  return isError ? (
    <Text>Error: {error?.message}</Text>
  ) : (
    <FlashList
      contentContainerStyle={{
        padding: 15,
      }}
      data={data?.pages.flatMap((page) => page.results)}
      renderItem={({ item }) => (
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <MovieCard
            {...item}
            width={175}
            onPress={() => {
              navigation.dispatch(
                StackActions.push('Detail', { id: item.id, title: item.title }),
              )
            }}
          />
        </View>
      )}
      onEndReached={fetchNextPage}
      refreshing={isFetching}
      numColumns={2}
      onRefresh={fetchNextPage}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, i) => `${i}-${item.id}`}
      estimatedItemSize={175}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() => {
        if (isFetching) {
          return <ActivityIndicator size="large" color="#3495ff" animating />
        }
      }}
    />
  )
}
