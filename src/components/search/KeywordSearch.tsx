import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import MovieCard from '../MovieCard';
import { fetchMoviesByTitle, Movie } from '../../lib/fetch'; 

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchMoviesByTitle(keyword);
      setMovies(result.results);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard key={item.id} {...item} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by keyword"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieCard}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default KeywordSearch;