import { Genres, MovieDetail, Movies } from '../global/types'

async function fetchTMDB<T>(path: string, method = 'GET') {
  return fetch(`${process.env.EXPO_PUBLIC_TMDB_API_BASE_URL}${path}`, {
    method: method,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `${res.status} (${res.json().then((data) => data.status_message)})`,
      )
    }
    return res.json() as Promise<T>
  })
}

const fetchPopularMovies = async (page: number): Promise<Movies> => {
  return fetchTMDB(`/movie/popular?page=${page}`)
}

const fetchMovieDetail = async (movie_id: number): Promise<MovieDetail> => {
  return fetchTMDB(`/movie/${movie_id}?append_to_response=release_dates`)
}

const fetchAvailableMovieGenres = async (): Promise<Genres> => {
  return fetchTMDB('/genre/movie/list')
}

const fetchMovies = async (
  page: number,
  params: Record<string, string>,
): Promise<Movies> => {
  return fetchTMDB(
    `/discover/movie?${new URLSearchParams({
      ...params,
      page: page.toString(),
      include_adult: 'true',
    }).toString()}`,
  )
}

const fetchMoviesByTitle = async (title: string): Promise<Movies> => {
  return fetchTMDB(
    `/search/movie?${new URLSearchParams({ query: title, include_adult: 'true' }).toString()}`,
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

const fetchRecommendedMovies = async (
  movie_id: number,
  page = 1,
): Promise<Movies> => {
  return fetchTMDB(`/movie/${movie_id}/recommendations?page=${page}`)
}

export {
  fetchAvailableMovieGenres,
  fetchMovieDetail,
  fetchMovies,
  fetchMoviesByTitle,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
}
