import { StackActions, useNavigation } from '@react-navigation/native'
import { Skeleton } from '@rneui/themed'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Movie } from '../global/types'
import MovieCard from './MovieCard'
import SectionLabel from './SectionLabel'

interface MovieListProps {
  landscape?: boolean
  title: string
  onSeeMore: () => void
  isLoading: boolean
  data: Movie[]
  seeMoreDisabled?: boolean
}

export default function MovieList(props: MovieListProps): React.ReactElement {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <SectionLabel label={props.title} />
        <Button
          icon="chevron-right"
          textColor="#007AFF"
          contentStyle={styles.seeMore}
          onPress={props.onSeeMore}
          disabled={props.seeMoreDisabled}
          compact
        >
          See more
        </Button>
      </View>
      {props.isLoading ? (
        <Skeleton width="100%" height={200} animation="wave" />
      ) : (
        <FlatList
          data={props.data}
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
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.notFoundContainer}>
              <Text variant="headlineMedium" style={styles.fontExtraBold}>
                No movies found
              </Text>
            </View>
          )}
          horizontal
        />
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
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})
