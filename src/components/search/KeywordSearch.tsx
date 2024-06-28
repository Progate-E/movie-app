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
import { FontAwesome } from '@expo/vector-icons'


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
      <View style={styles.searchWrapper}>
      <FontAwesome name="search" size={24} color="#7d8289" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Input movie title here"
        onChangeText={(text: string) => setSearch(text)}
        value={search}
      />
      
      
      </View>
    </View>
    <ScrollView>
      <View style={styles.container}>
        {search.length > 0 && movies.length === 0 ? ( // Tambahkan kondisi ini
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No movies found!
            </Text>
          </View>
        ) : (
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
        )}
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 0,
  },
  input: {
    backgroundColor: '#eaf4ff',
    padding: 12, // Ubah padding untuk meningkatkan ukuran input
    height: 55,
    width: '91%',
    marginBottom: 16,
    marginTop:18,
    alignItems: 'center'
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
  searchWrapper:{
    backgroundColor:'#fff',
    alignItems: 'center',
    marginTop:5,


  },
  searchIcon:{
    position:'absolute',
    zIndex:1,
    right:30,
    top:33,
  }
})
