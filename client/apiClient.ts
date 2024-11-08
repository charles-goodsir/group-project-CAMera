import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Movie } from './models/Movies'

// export async function getMovie(): Promise<string> {
//   const res = await request.get('/api/v1/movie')
//   return res.body.title
// }

export async function useMovie(movieTitle: string): Promise<Movie> {
  if (!movieTitle) {
    throw new Error('Movie title is required')
  }

  const res = await request.get('/api/v1/movie').query({ title: movieTitle })

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
