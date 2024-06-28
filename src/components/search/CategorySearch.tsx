import { Picker } from '@react-native-picker/picker';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { fetchOptions } from '../../data/fetchOption';
import { Movie } from '../../global/types';
import MovieCard from '../MovieCard';

interface CategoryType {
  id: number;
  name: string;
}

const nilCategory: CategoryType = {
  id: -999,
  name: 'Genres',
};

export default function CategorySearch(): JSX.Element {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selected, setSelected] = useState<CategoryType>(nilCategory);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // null indicates no year selected
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNoResults, setShowNoResults] = useState<boolean>(false); // Track when to show "No results found"

  const getCategories = async (): Promise<void> => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const options = fetchOptions();

    try {
      const request = await fetch(url, options);
      const response = await request.json();
      setCategories([nilCategory, ...response.genres]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMoviesByGenre = async (genreId: number): Promise<void> => {
    setIsLoading(true);
    setMovies([]);
    try {
      let url = `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}/discover/movie?with_genres=${genreId}`;
      if (selectedYear !== null) {
        url += `&primary_release_year=${selectedYear}`;
      }
      const options = fetchOptions();

      const req = await fetch(url, options);
      const res = await req.json();

      setMovies(res.results);
      setIsLoading(false);
      setShowNoResults(res.results.length === 0); // Set showNoResults based on whether there are results
    } catch (error) {
      setIsLoading(false);
      setShowNoResults(true); // Show no results on error
      console.error('Error fetching movies by genre:', error);
    }
  };

  const fetchMoviesByYear = async (year: number): Promise<void> => {
    setIsLoading(true);
    setMovies([]);
    try {
      let url = `${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}/discover/movie`;
      url += `?primary_release_year=${year}`;
      const options = fetchOptions();

      const req = await fetch(url, options);
      const res = await req.json();

      setMovies(res.results);
      setIsLoading(false);
      setShowNoResults(res.results.length === 0); // Set showNoResults based on whether there are results
    } catch (error) {
      setIsLoading(false);
      setShowNoResults(true); // Show no results on error
      console.error('Error fetching movies by year:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // Check if selected category is nilCategory and no year selected
    if (selected.id !== nilCategory.id || selectedYear !== null) {
      if (selected.id !== nilCategory.id) {
        fetchMoviesByGenre(selected.id);
      } else {
        fetchMoviesByYear(selectedYear || new Date().getFullYear());
      }
    } else {
      // Reset movies and showNoResults when no category is selected
      setMovies([]);
      setShowNoResults(false);
    }
  }, [selected, selectedYear]);

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title }),
    );
  };

  const years = Array.from(new Array(25), (_, index) => new Date().getFullYear() - index);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selected?.id}
            onValueChange={(itemValue) => {
              const selectedCategory =
                categories.find((cat) => cat.id === itemValue) || nilCategory;
              setSelected(selectedCategory);
            }}
            style={styles.picker}
            onFocus={() => {
              setSelected({} as CategoryType);
            }}
          >
            {categories.map((category: CategoryType) =>
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
                style={{
                  color: category.id === nilCategory.id ? '#7d8289' : '#1a4a7f',
                  fontSize: category.id === nilCategory.id ? 18 : 18,
                }}
              />
            )}
          </Picker>

          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => {
              setSelectedYear(itemValue !== -999 ? itemValue : null);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Years" value={-999} style={styles.placeholder} />
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} style={styles.pickerItem} />
            ))}
          </Picker>
        </View>
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
        ) : !isLoading && showNoResults && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 18,
    paddingHorizontal: 21,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    backgroundColor: '#eaf4ff',
    padding: 12,
    height: 50,
    width: '48%', // Adjust width as per your requirement
    marginBottom: 0,
  },
  pickerItem: {
    color: '#1a4a7f',
    fontSize: 18,
  },
  placeholder: {
    color: '#7d8289',
    fontSize: 18,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 675,
    paddingHorizontal: 16,
    marginTop: 20,
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
});
