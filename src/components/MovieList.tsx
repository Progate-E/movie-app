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
  useEffect(() => {
    props
      .fetchFunc()
      .then((data) => {
        setMovies(data)
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
        <Text
          variant="headlineMedium"
          style={{
            fontWeight: '900',
          }}
        >
          {props.title}
        </Text>
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
      {movies.results &&
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
          <Text
            variant="displayMedium"
            style={{
              textAlign: 'center',
              fontWeight: '900',
            }}
          >
            No movies found
          </Text>
        ))}
    </View>
  )
}
