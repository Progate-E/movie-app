import {
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, TextInput } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieCard from '../MovieCard'
import { Movie } from '../../global/types'
import { fetchMoviesByTitle } from '../../lib/fetch'

export default function KeywordSearch(): React.ReactElement {
  const [search, setSearch] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    if (search.length > 0) {
      const fetchSearchedMovies = async () => {
        try {
          const response = await fetchMoviesByTitle(search)
          setMovies(response.results)
        } catch (error) {
          console.error('Error fetching searched movies:', error)
        }
      }
      fetchSearchedMovies()
    }
  }, [search])

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }),
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input movie title here"
          onChangeText={(text: string) => setSearch(text)}
          value={search}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                popularity={movie.popularity}
                vote_average={movie.vote_average}
                overview={movie.overview}
                release_date={movie.release_date}
                backdrop_path={movie.backdrop_path}
                onPress={() => handleMoviePress(movie)}
              />
            ))
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                No movies found!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 8,
  },
  input: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
