import { useInfiniteQuery } from '@tanstack/react-query'
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchRecommendedMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../lib/fetch'

const fetchFuncMap = {
  popular: fetchPopularMovies,
  recommended: fetchRecommendedMovies,
  nowPlaying: fetchNowPlayingMovies,
  topRated: fetchTopRatedMovies,
  upcoming: fetchUpcomingMovies,
  discover: fetchMovies,
}

export type FetchType = keyof typeof fetchFuncMap
const getFetchFunc = (
  fetchType: FetchType,
  movieId: number,
  params: Record<string, string>,
) => {
  switch (fetchType) {
    case 'discover':
      return (page: number) => fetchMovies(page, params)
    case 'recommended':
      return (page: number) => fetchRecommendedMovies(movieId, page)
    default:
      return fetchFuncMap[fetchType]
  }
}

export default function useMovies(
  fetchType: FetchType,
  movieId = 0,
  params: Record<string, string> = {},
) {
  const fetchFunc = getFetchFunc(fetchType, movieId, params)

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [fetchType, movieId, params],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchFunc(pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  })

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  }
}
