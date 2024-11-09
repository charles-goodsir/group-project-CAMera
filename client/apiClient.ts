// import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Movie } from './models/Movies'
import dotenv from 'dotenv'

dotenv.config()

// // export async function getMovie(): Promise<string> {
// //   const res = await request.get('/api/v1/movie')
// //   return res.body.title
// // }
const API_KEY = process.env.OMDB_API_KEY
export async function fetchMovie(movieTitle: string): Promise<Movie> {
  if (!movieTitle) {
    throw new Error('Movie title is required')
  }

  const res = await request.get('https://www.omdbapi.com/').query({ t: movieTitle, apiKey: API_KEY })

  if (res.body && res.body.Title) {
    return res.body
  } else {
    throw new Error('Movie not found')
  }
}

// export function useGetByYear(year: number) {
//   return useQuery({
//     queryKey: ['movies', year],
//     queryFn: async () => {
//       const res = await request.get(`/api/v1/movie/${year}`)
//       return res.body as Movie
//     },
//   })
// }


