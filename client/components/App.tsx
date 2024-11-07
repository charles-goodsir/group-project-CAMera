import { useState, FormEvent, ChangeEvent  } from 'react'
import { useMovie } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'


const App = () => {
  const [year, setYear] = useState('')
  
  
  const {
    data: Movie,
    isError,
    isPending,
  } = useQuery({ queryKey: ['Movie', year], queryFn: useMovie })

    async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()}

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
      setYear(evt.currentTarget.value);
    }
    

  if (isPending) return <p>Grabbing your movie!</p>

  if (isError) return <p>Cannot find your movie soz</p>

  

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
      type="number" 
      value={year} 
      placeholder="Enter a year"
      onChange={handleChange} 
      />
    </form>
  )
}

export default App
