import { Genre, MovieDetail, Movies } from '../global/types'

async function fetchTMDB<T>(path: string, method = 'GET') {
  return fetch(`${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}${path}`, {
    method: method,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} (${res.statusText})`)
    }
    return res.json() as Promise<T>
  })
}

const fetchPopularMovies = async (page: number): Promise<Movies> => {
  return fetchTMDB(`/movie/popular?page=${page}`)
}

const fetchMovieDetail = async (movie_id: number): Promise<MovieDetail> => {
  return fetchTMDB(`/movie/${movie_id}`)
}

const fetchAvailableMovieGenres = async (): Promise<Genre[]> => {
  return fetchTMDB('/genre/movie/list')
}

const fetchMoviesByGenre = async (
  genres: number[] | number,
): Promise<Movies> => {
  return fetchTMDB(
    `/discover/movie?${new URLSearchParams({ with_genres: genres.toString() }).toString()}`,
  )
}

const fetchMoviesByTitle = async (title: string): Promise<Movies> => {
  return fetchTMDB(
    `/search/movie?${new URLSearchParams({ query: title }).toString()}`,
  )
}

const fetchNowPlayingMovies = async (page: number): Promise<Movies> => {
  return fetchTMDB(`/movie/now_playing?page=${page}`)
}

const fetchTopRatedMovies = async (page: number): Promise<Movies> => {
  return fetchTMDB(`/movie/top_rated?page=${page}`)
}

const fetchUpcomingMovies = async (page: number): Promise<Movies> => {
  return fetchTMDB(`/movie/upcoming?page=${page}`)
}

const fetchRecommendedMovies = async (movie_id: number): Promise<Movies> => {
  return fetchTMDB(`/movie/${movie_id}/recommendations`)
}

export {
  fetchAvailableMovieGenres,
  fetchMovieDetail,
  fetchMoviesByGenre,
  fetchMoviesByTitle,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
}
