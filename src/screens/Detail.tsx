import { ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ActivityIndicator, Divider, Text } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import MovieList from '../components/MovieList'
import { MovieDetail } from '../global/types'
import { fetchMovieDetail, fetchRecommendedMovies } from '../lib/fetch'

interface DetailProps {
  id: number
}

export default function Detail({
  route,
}: NativeStackScreenProps<ParamListBase>): React.ReactElement {
  const [movie, setMovie] = useState<MovieDetail>({} as MovieDetail)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = route.params as DetailProps
  useEffect(() => {
    fetchMovieDetail(id)
      .then((data) => {
        setMovie(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <View
      style={{
        width: '100%',
      }}
    >
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <ScrollView>
          <MovieCard
            width="100%"
            height={250}
            landscape
            unPressable
            {...movie}
          />
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Text variant="bodyMedium">{movie.overview}</Text>
            <Divider
              style={{
                marginVertical: 5,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                variant="labelLarge"
                style={{
                  fontWeight: '900',
                }}
              >
                Release Date:{' '}
              </Text>
              <Text variant="bodyMedium">
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                variant="labelLarge"
                style={{
                  fontWeight: '900',
                }}
              >
                {movie.spoken_languages.length > 1
                  ? 'Languages: '
                  : 'Language: '}
              </Text>
              <Text variant="bodyMedium">
                {movie.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(', ')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                variant="labelLarge"
                style={{
                  fontWeight: '900',
                }}
              >
                Rating:{' '}
              </Text>
              <Text variant="bodyMedium">
                {`${movie.vote_average.toPrecision(2)} (${movie.vote_count} votes)`}
              </Text>
            </View>
          </View>
          <MovieList
            title="You may also like"
            fetchFunc={async () => fetchRecommendedMovies(movie.id)}
            onSeeMore={() => {
              console.log('See More')
            }}
          />
        </ScrollView>
      )}
    </View>
  )
}
