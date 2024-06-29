import { FontAwesome } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper' // Import ActivityIndicator from react-native-paper
import { Movie } from '../../global/types'
import { fetchMoviesByTitle } from '../../lib/fetch'
import MovieCard from '../MovieCard'

export default function KeywordSearch(): React.ReactElement {
  const [search, setSearch] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false) // State for loading indicator
  const navigation = useNavigation()

  useEffect(() => {
    if (search.length > 0) {
      const fetchSearchedMovies = async () => {
        setIsLoading(true) // Set loading to true when fetching starts
        try {
          const response = await fetchMoviesByTitle(search)
          setMovies(response.results)
        } catch (error) {
          console.error('Error fetching searched movies:', error)
        } finally {
          setIsLoading(false) // Set loading to false regardless of success or failure
        }
      }
      fetchSearchedMovies()
    } else {
      setMovies([]) // Clear movies when search input is empty
    }
  }, [search])

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }),
    )
  }

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <FontAwesome
            name="search"
            size={23}
            color="#7d8289" // Set icon color same as picker placeholder arrow color
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Insert movie title here"
            onChangeText={(text: string) => setSearch(text)}
            value={search}
            placeholderTextColor="#7d8289" // Set placeholder text color
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 525,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#1a4a7f"
            style={styles.loading}
          />
        )}
        <View style={styles.container}>
          {search.length > 0 && movies.length === 0 && !isLoading ? ( // Show "No movies found!" only when not loading
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No movies found!</Text>
            </View>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onPress={() => handleMoviePress(movie)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#eaf4ff',
    padding: 12, // Increase padding for larger input size
    height: 55,
    width: '89%',
    marginBottom: 13,
    marginTop: 18,
    alignItems: 'center',
    color: '#1a4a7f', // Set text color to match picker category color
    fontSize: 18, // Set font size
    paddingLeft: 16,
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
  searchWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 40,
    top: 33,
  },
  loading: {
    width: '100%',
  },
})
