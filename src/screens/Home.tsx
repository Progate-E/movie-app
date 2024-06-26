import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieList from '../components/MovieList'
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../lib/fetch'

export default function Home(): React.ReactElement {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <ScrollView>
        <MovieList
          title="Now Playing"
          fetchFunc={async () => fetchNowPlayingMovies(1)}
          onSeeMore={() => {
            navigation.dispatch(
              StackActions.push('AllMovies', {
                title: 'Now Playing',
                fetchType: 'nowPlaying',
              }),
            )
          }}
          landscape
        />
        <MovieList
          title="Upcoming"
          fetchFunc={async () => fetchUpcomingMovies(1)}
          onSeeMore={() => {
            navigation.dispatch(
              StackActions.push('AllMovies', {
                title: 'Upcoming Movies',
                fetchType: 'upcoming',
              }),
            )
          }}
        />
        <MovieList
          title="Top Rated"
          fetchFunc={async () => fetchTopRatedMovies(1)}
          onSeeMore={() => {
            navigation.dispatch(
              StackActions.push('AllMovies', {
                title: 'Top Rated Movies',
                fetchType: 'topRated',
              }),
            )
          }}
        />
        <MovieList
          title="Popular"
          fetchFunc={async () => fetchPopularMovies(1)}
          onSeeMore={() => {
            navigation.dispatch(
              StackActions.push('AllMovies', {
                title: 'Popular Movies',
                fetchType: 'popular',
              }),
            )
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
