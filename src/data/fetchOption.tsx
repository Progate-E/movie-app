export const fetchOptions = (): {
  method: string
  headers: { accept: string; Authorization: string }
} => {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
    },
  }
}
