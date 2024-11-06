// import request from 'superagent'
// import { useQuery } from '@tanstack/react-query'
// import { Movie as MovieModel } from '../models/Movies'

// function useMovie(movieTitle: string) {
//   return useQuery<MovieModel, Error>({
//     queryKey: ['movies', movieTitle],
//     queryFn: async () => {
//       const apiUrl = `/api/v1/movie?title=${movieTitle}`

//       const res = await request.get(apiUrl)

//       if (res.body.error) {
//         throw new Error(res.body.error)
//       }

//       return res.body as MovieModel
//     },
//   })
// }

// export default useMovie
