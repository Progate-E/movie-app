import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MovieList from '../components/MovieList'
import { Movies } from '../global/types'
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../lib/fetch'

interface MoviesData {
  data: Movies
  isLoading: boolean
}

export default function Home(): React.ReactElement {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MoviesData>({
    data: {} as Movies,
    isLoading: true,
  })
  const [upcomingMovies, setUpcomingMovies] = useState<MoviesData>({
    data: {} as Movies,
    isLoading: true,
  })
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesData>({
    data: {} as Movies,
    isLoading: true,
  })
  const [popularMovies, setPopularMovies] = useState<MoviesData>({
    data: {} as Movies,
    isLoading: true,
  })

  useEffect(() => {
    fetchNowPlayingMovies()
      .then((data) => {
        setNowPlayingMovies({ data, isLoading: false })
      })
      .catch((e) => {
        console.error(e)
      })

    fetchUpcomingMovies()
      .then((data) => {
        setUpcomingMovies({ data, isLoading: false })
      })
      .catch((e) => {
        console.error(e)
      })

    fetchTopRatedMovies()
      .then((data) => {
        setTopRatedMovies({ data, isLoading: false })
      })
      .catch((e) => {
        console.error(e)
      })

    fetchPopularMovies()
      .then((data) => {
        setPopularMovies({ data, isLoading: false })
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <ScrollView>
        <MovieList
          title="Currently In Theaters"
          data={nowPlayingMovies.data.results}
          isLoading={nowPlayingMovies.isLoading}
          seeMoreDisabled={
            !nowPlayingMovies.data || nowPlayingMovies.data.total_pages <= 1
          }
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
          title="Upcoming Movies"
          data={upcomingMovies.data.results}
          isLoading={upcomingMovies.isLoading}
          seeMoreDisabled={
            !upcomingMovies.data || upcomingMovies.data.total_pages <= 1
          }
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
          title="Top Rated Movies"
          data={topRatedMovies.data.results}
          isLoading={topRatedMovies.isLoading}
          seeMoreDisabled={
            !topRatedMovies.data || topRatedMovies.data.total_pages <= 1
          }
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
          title="Popular Movies"
          data={popularMovies.data.results}
          isLoading={popularMovies.isLoading}
          seeMoreDisabled={
            !popularMovies.data || popularMovies.data.total_pages <= 1
          }
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
