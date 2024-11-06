import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import request from 'superagent'
import dotenv from 'dotenv'
dotenv.config()

//I wrote down a console log so that when you run server it should display your keyu, if it doesn't it'll be undefined
const server = express()
console.log('OMDB API Key:', process.env.OMDB_API_KEY)
server.get('/api/v1/movie', async (req, res) => {
  const movieTitle = req.query.title as string
  if (!movieTitle) {
    return res.status(400).json({ error: 'Movie title is required' })
  }
  //Make sure you have an API key set up in .env
  const apiKey = process.env.OMDB_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OMDB API key is missing' })
  }

  const url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`

  try {
    const movieRes = await request.get(url)

    if (movieRes.body.Response === 'False') {
      return res.status(404).json({ error: movieRes.body.Error })
    }

    res.json(movieRes.body)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch movie details' })
  }
})

server.use(express.json())
server.use(cors('*' as CorsOptions))

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
