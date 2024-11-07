import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Movie } from './models/Movies'

// export async function getMovie(): Promise<string> {
//   const res = await request.get('/api/v1/movie')
//   return res.body.title
// }

export function useMovie() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await request.get('/api/v1/movie')
      return res.body.movie
    },
  })
}

export function useGetByYear(year: number) {
  return useQuery({
    queryKey: ['movies', year],
    queryFn: async () => {
      const res = await request.get(`/api/v1/movie/${year}`)
      return res.body as Movie
    },
  })
}
