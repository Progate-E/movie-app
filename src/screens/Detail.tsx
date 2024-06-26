import {
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
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
  const navigation = useNavigation()
  const [movie, setMovie] = useState<MovieDetail>({} as MovieDetail)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { id } = route.params as DetailProps
  useEffect(() => {
    fetchMovieDetail(id)
      .then((data) => {
        setMovie(data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <MovieCard
            width="100%"
            height={250}
            landscape
            unPressable
            {...movie}
          />
          <View style={[styles.ph10, styles.mb5]}>
            <Text variant="bodyMedium" style={[styles.mb5, styles.textJustify]}>
              {movie.overview ||
                "We don't have any overview information for this movie yet."}
            </Text>
            <View style={styles.inlineData}>
              <Text
                variant="labelLarge"
                style={{
                  fontWeight: '900',
                }}
              >
                Release Date:{' '}
              </Text>
              <Text variant="bodyMedium">
                {(movie.release_date &&
                  new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })) ||
                  movie.status ||
                  'Unknown'}
              </Text>
            </View>
            <View style={styles.inlineData}>
              <Text variant="labelLarge" style={styles.fontExtraBold}>
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
            <View style={styles.inlineData}>
              <Text variant="labelLarge" style={styles.fontExtraBold}>
                Rating:{' '}
              </Text>
              <Text variant="bodyMedium">
                {`${movie.vote_average.toPrecision(2)} (${movie.vote_count} ${movie.vote_count > 1 ? 'votes' : 'vote'})`}
              </Text>
            </View>
          </View>
          <MovieList
            title="You may also like"
            fetchFunc={async () => fetchRecommendedMovies(movie.id)}
            onSeeMore={() => {
              navigation.dispatch(
                StackActions.push('AllMovies', {
                  title: 'Recommended Movies',
                  fetchType: 'recommended',
                  movieId: movie.id,
                }),
              )
            }}
          />
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mb5: {
    marginBottom: 5,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  inlineData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fontExtraBold: {
    fontWeight: '900',
  },
  textJustify: {
    textAlign: 'justify',
  },
})
