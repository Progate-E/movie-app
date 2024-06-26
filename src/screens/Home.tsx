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
  return (
    <SafeAreaView>
      <ScrollView>
        <MovieList
          title="Now Playing"
          fetchFunc={async () => fetchNowPlayingMovies(1)}
          onSeeMore={() => {
            console.log('See more')
          }}
          landscape
        />
        <MovieList
          title="Upcoming"
          fetchFunc={async () => fetchUpcomingMovies(1)}
          onSeeMore={() => {
            console.log('See more')
          }}
        />
        <MovieList
          title="Top Rated"
          fetchFunc={async () => fetchTopRatedMovies(1)}
          onSeeMore={() => {
            console.log('See more')
          }}
        />
        <MovieList
          title="Popular"
          fetchFunc={async () => fetchPopularMovies(1)}
          onSeeMore={() => {
            console.log('See more')
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
