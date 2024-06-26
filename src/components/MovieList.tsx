import { Skeleton } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Movies } from '../global/types'
import MovieCard from './MovieCard'

interface MovieListProps {
  landscape?: boolean
  title: string
  fetchFunc: () => Promise<Movies>
  onSeeMore: () => void
}

export default function MovieList(props: MovieListProps): React.ReactElement {
  const [movies, setMovies] = useState<Movies>({} as Movies)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    props
      .fetchFunc()
      .then((data) => {
        setMovies(data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <View
      style={{
        paddingHorizontal: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              width: 20,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#3495ff',
              marginRight: 12,
            }}
          ></View>
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: '900',
            }}
          >
            {props.title}
          </Text>
        </View>
        <Button
          icon="chevron-right"
          textColor="#007AFF"
          contentStyle={{
            flexDirection: 'row-reverse',
          }}
          onPress={props.onSeeMore}
          disabled={!movies.results || movies.results.length === 0}
          compact
        >
          See more
        </Button>
      </View>
      {isLoading ? (
        <Skeleton width="100%" height={200} animation="wave" />
      ) : (
        movies.results &&
        (movies.results.length > 0 ? (
          <FlatList
            data={movies.results}
            renderItem={({ item }) => (
              <MovieCard landscape={props.landscape} {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        ) : (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
            }}
          >
            <Text
              variant="headlineMedium"
              style={{
                textAlign: 'center',
                fontWeight: '900',
              }}
            >
              No movies found
            </Text>
          </View>
        ))
      )}
    </View>
  )
}
