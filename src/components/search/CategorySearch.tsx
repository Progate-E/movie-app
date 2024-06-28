import { Picker } from '@react-native-picker/picker'
import { StackActions, useNavigation } from '@react-navigation/native' // Import navigation
import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
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
} // `placeholder` category coz react-native-picker's placeholder prop only works on Windows

export default function CategorySearch(): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selected, setSelected] = useState<CategoryType>(nilCategory)
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation() // Initialize navigation
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

  const onSubmit = async () => {
    if (selected) {
      setIsLoading(true)
      setMovies([])
      try {
        const url = `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}/discover/movie?with_genres=${selected.id}`
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
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }), // Navigate to MovieDetail screen
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
            setSelected({} as CategoryType) // when the selector is displayed, set the selected category to an empty object to prevent the placeholder from being selected
          }}
        >
          {categories.map((category: CategoryType) =>
            category.id === nilCategory.id ? (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
                enabled={selected.id === nilCategory.id}
              />
            ) : (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ),
          )}
        </Picker>
        <Button
          disabled={selected.id === nilCategory.id}
          title="Search"
          onPress={onSubmit}
          color="#1a4a7f"
        />
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
              onPress={() => handleMoviePress(movie)} // Handle navigation to movie detail page
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    width: '100%',
    marginBottom: 16,
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})
