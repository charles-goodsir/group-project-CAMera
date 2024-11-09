import { FormEvent, useState } from 'react'
import { fetchMovie } from '../apiClient'
import { useQuery } from '@tanstack/react-query'
import '../Style/Style.css'

const App = () => {
  const [movieTitle, setMovieTitle] = useState('')
  const [searchTitle, setSearchTitle] = useState('')

  const {
    data: movie,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['movie', searchTitle],
    queryFn: () => fetchMovie(searchTitle),
  })

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setMovieTitle(e.currentTarget.value)
  }

  const handleSearchClick = () => {
    setSearchTitle(movieTitle)
  }

  if (isPending) return <p>Grabbing your movie!</p>

  return (
    <form onSubmit={(e) => e.preventDefault()} className="form">
      <input
        type="text"
        value={movieTitle}
        onChange={handleInputChange}
        placeholder="Enter movie title"
      />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>

      {movie && (
        <div>
          <h1>{movie.Title}</h1>

          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
        </div>
      )}

      {isError && <p style={{ color: 'red' }}>Cannot find your movie soz</p>}
    </form>
  )
}

export default App
