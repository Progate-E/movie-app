import { Picker } from '@react-native-picker/picker'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { fetchOptions } from '../../data/fetchOption'
import { Movie } from '../../global/types'
import MovieCard from '../MovieCard'

interface CategoryType {
  id: number
  name: string
}

const nilCategory: CategoryType = {
  id: -999,
  name: 'Select a category', 
}

export default function CategorySearch(): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selected, setSelected] = useState<CategoryType>(nilCategory)
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getCategories = async (): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list'
    const options = fetchOptions()

    try {
      const request = await fetch(url, options)
      const response = await request.json()
      setCategories([nilCategory, ...response.genres])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchMoviesByGenre = async (genreId: number): Promise<void> => {
    setIsLoading(true)
    setMovies([])
    try {
      const url = `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}/discover/movie?with_genres=${genreId}`
      const options = fetchOptions()

      const req = await fetch(url, options)
      const res = await req.json()

      setMovies(res.results)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching movies by genre:', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (selected.id !== nilCategory.id) {
      fetchMoviesByGenre(selected.id)
    }
  }, [selected])

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }),
    )
  }

  return (
    <View>
      <View style={styles.container}>
        <Picker
          selectedValue={selected?.id}
          onValueChange={(itemValue) => {
            const selectedCategory =
              categories.find((cat) => cat.id === itemValue) || nilCategory
            setSelected(selectedCategory)
          }}
          style={styles.picker}
          onFocus={() => {
            setSelected({} as CategoryType)
          }}
        >
          {categories.map((category: CategoryType) =>
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
              style={{
                color: category.id === nilCategory.id ? '#7d8289' : '#1a4a7f', // Adjust colors based on selection
                fontSize: category.id === nilCategory.id ? 18 : 18, // Adjust font size based on selection
              }}
            />
          )}
        </Picker>
      </View>
      <ScrollView
        contentContainerStyle={styles.moviesContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#1a4a7f"
            style={styles.loading}
          />
        )}
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
            <Text style={styles.noResultsText}></Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 18,
    paddingHorizontal: 21,
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: '#eaf4ff',
    padding: 12,
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 675,
    paddingHorizontal: 16,
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
  loading: {
    width: '100%',
  },
})