import { StackActions, useNavigation } from '@react-navigation/native'
import { Skeleton } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Movies } from '../global/types'
import MovieCard from './MovieCard'

interface MovieListProps {
  landscape?: boolean
  title: string
  fetchFunc: () => Promise<Movies>
  onSeeMore: () => void
}

export default function MovieList(props: MovieListProps): React.ReactElement {
  const [movies, setMovies] = useState<Movies>({} as Movies)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigation = useNavigation()
  useEffect(() => {
    props
      .fetchFunc()
      .then((data) => {
        setMovies(data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <View style={styles.listLabel}>
          <View style={styles.thatThingOnTheLeft}></View>
          <Text variant="headlineMedium" style={styles.fontExtraBold}>
            {props.title}
          </Text>
        </View>
        <Button
          icon="chevron-right"
          textColor="#007AFF"
          contentStyle={styles.seeMore}
          onPress={props.onSeeMore}
          disabled={!movies.results || movies.results.length === 0}
          compact
        >
          See more
        </Button>
      </View>
      {isLoading ? (
        <Skeleton width="100%" height={200} animation="wave" />
      ) : (
        movies.results &&
        (movies.results.length > 0 ? (
          <FlatList
            data={movies.results}
            renderItem={({ item }) => (
              <MovieCard
                landscape={props.landscape}
                {...item}
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('Detail', {
                      id: item.id,
                      title: item.title,
                    }),
                  )
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        ) : (
          <View style={styles.notFoundContainer}>
            <Text
              variant="headlineMedium"
              style={[styles.textCenter, styles.fontExtraBold]}
            >
              No movies found
            </Text>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLabel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thatThingOnTheLeft: {
    width: 20,
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#3495ff',
    marginRight: 12,
  },
  fontExtraBold: {
    fontWeight: '900',
  },
  seeMore: {
    flexDirection: 'row-reverse',
  },
  notFoundContainer: {
    height: 200,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
})
