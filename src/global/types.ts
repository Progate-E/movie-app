interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface ReleaseDate {
  certification: string
  descriptors: []
  iso_639_1: string
  note: string
  release_date: string
  type: number
}

interface ReleaseDates {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

interface ReleaseDatesResponse {
  id: number
  results: ReleaseDates[]
}

interface Movies {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface Genres {
  genres: Genre[]
}

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  release_dates: ReleaseDatesResponse // needed for certification
  casts: Casts
}

interface MovieParams {
  keyword?: string
  genre?: number[] | number
}

interface NavProps {
  title: string
}

interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface Casts {
  cast: Cast[]
}

export { Genre, Genres, Movie, MovieDetail, MovieParams, Movies, NavProps }
