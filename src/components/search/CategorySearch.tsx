import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Movie } from '../../global/types';
import { fetchOptions } from '../../data/fetchOption';
import MovieCard from '../MovieCard';
import { StackActions, useNavigation } from '@react-navigation/native'; // Import navigation

interface CategoryType {
  id: number;
  name: string;
}

export default function CategorySearch(): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation(); // Initialize navigation

  const getCategories = async (): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const options = fetchOptions();

    try {
      const request = await fetch(url, options);
      const response = await request.json();
      setCategories(response.genres);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onSubmit = async () => {
    if (category) {
      try {
        const url = `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}/discover/movie?with_genres=${category.id}`;
        const options = fetchOptions();

        const req = await fetch(url, options);
        const res = await req.json();

        setMovies(res.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }) // Navigate to MovieDetail screen
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Picker
          selectedValue={category?.id}
          onValueChange={(itemValue, itemIndex) => {
            const selectedCategory = categories.find(cat => cat.id === itemValue);
            setCategory(selectedCategory);
          }}
          style={styles.picker}
        >
          {categories.map((category: CategoryType) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
        <Button
          disabled={!category}
          title="Search"
          onPress={onSubmit}
          color="#1a4a7f"
        />
      </View>
      <View style={styles.moviesContainer}>
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
            <Text style={styles.noResultsText}>
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 16,
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
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
});
