import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ParamListBase,
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import MovieBanner from '../components/MovieBanner'
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
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  useFocusEffect(
    useCallback(() => {
      fetchMovieDetail(id)
        .then((data) => {
          setMovie(data)
          checkFavoriteStatus(data)
          setIsLoading(false)
        })
        .catch((e) => {
          console.error(e)
        })
    }, []),
  )

  const checkFavoriteStatus = async (movie: MovieDetail): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: MovieDetail[] = JSON.parse(initialData)
        const isFav = favMovieList.some((favMovie) => favMovie.id === movie.id)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addFavorite = async (movie: MovieDetail): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      let favMovieList: MovieDetail[] = []

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.error(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: MovieDetail[] = JSON.parse(initialData)
        const newFavMovieList = favMovieList.filter(
          (favMovie) => favMovie.id !== id,
        )
        await AsyncStorage.setItem(
          '@FavoriteList',
          JSON.stringify(newFavMovieList),
        )

        setIsFavorite(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFavoritePress = (): void => {
    if (isFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <MovieBanner
            isFavorite={isFavorite}
            onFavoritePress={handleFavoritePress}
            height={250}
            certification={
              movie.release_dates.results
                .filter((rd) => rd.iso_3166_1 === 'US')[0]
                ?.release_dates?.filter((rd) => rd.type === 3)[0]
                ?.certification || 'NR'
            }
            landscape
            {...movie}
          />
          <View style={[styles.ph10, styles.mb5]}>
            <Text variant="bodyMedium" style={[styles.textJustify, styles.mb5]}>
              {movie.overview ||
                "We don't have any overview information for this movie yet."}
            </Text>
            <View style={styles.inlineData}>
              <Text variant="labelLarge" style={styles.fontExtraBold}>
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
            title="You might also like"
            fetchFunc={async () => fetchRecommendedMovies(movie.id)}
            onSeeMore={() => {
              navigation.dispatch(
                StackActions.push('AllMovies', {
                  title: 'You Might Also Like',
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
