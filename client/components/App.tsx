import { useState } from 'react'
import { useGetByYear, useMovie } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'

// const App = () => {
//   const [count, setCount] = useState(0)

//   const {
//     data: greeting,
//     isError,
//     isPending,
//   } = useQuery({ queryKey: ['Movie', count], queryFn: useMovie })

//   if (isPending) return <p>Loading...</p>

//   return (
//     <>
//       {useMovie}
//       {count}
//       <h1>Movie by year</h1>
//       {isError && (
//         <p style={{ color: 'red' }}>
//           There was an error retrieving the greeting.
//         </p>
//       )}
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </>
//   )
// }

const App = () => {
  const [year, setYear] = useState('')

  const {
    data: Movie,
    isError,
    isPending,
  } = useQuery({ queryKey: ['Movie', year], queryFn: useMovie })

  if (isPending) return <p>Grabbing your movie!</p>

  if (isError) return <p>Cannot find your movie soz</p>

  return (
    <>
      <input
      type="number" 
      value={year} 
      placeholder="Enter a year"
      onChange={(e) => setYear(e.target.value)} 
      />
    </>
  )
}

export default App
