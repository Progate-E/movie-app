import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieCard from '../components/MovieCard'; 
import { Movie } from '../global/types'; 
import { Text } from 'react-native-paper';
import { StackActions, useNavigation } from '@react-navigation/native';

export default function Favorites(): React.ReactElement {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const storedMovies = await AsyncStorage.getItem('@FavoriteList');
        if (storedMovies !== null) {
          const parsedMovies: Movie[] = JSON.parse(storedMovies);
          setFavoriteMovies(parsedMovies);
        }else{
          setFavoriteMovies([])
        }
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const handleMoviePress = (movie: Movie) => {
    navigation.dispatch(
      StackActions.push('Detail', { id: movie.id, title: movie.title })
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
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
              />
            ))
          ) : (
            <View style={styles.noFavorites}>
              <Text style={styles.noFavoritesText}>No favorite movies yet!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  noFavorites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noFavoritesText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
