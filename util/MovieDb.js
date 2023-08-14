import axios from "axios"

API_KEY = '76fca2afbaaa5390f07f45b0ffa52811'

const movieDburlSearch = `https://api.themoviedb.org/3/search/movie?query=`
const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const ImageUrl = 'https://image.tmdb.org/t/p/w500'

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: { language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZjYTJhZmJhYWE1MzkwZjA3ZjQ1YjBmZmE1MjgxMSIsInN1YiI6IjY0OWI0MTE4YjFmNjhkMDBlNDZhZmE4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Zab8tJlpkqUvlMyzu5zvzAm8U1LXRLfUWypZ6AmWJQ'
  }
};


export async function popularMovies() {
  // axios.get(popularMoviesUrl, options).then(res => res.json()).then(res => console.log(res)).catch(err => console.log(err))
  const response = await axios(options)

  const res = response.data.results


  const list = []

  res.forEach(key => {
    const obj = {
      id: key.id,
      name: key.original_title,
      overview: key.overview,
      poster: ImageUrl + key.poster_path,
    }
    list.push(obj)
  });
  // console.log(list)
  return list

}

export async function searchMovies(name) {
  const response = await axios.get(movieDburlSearch + `${name}&api_key=${API_KEY}`)

  const res = response.data.results


  const list = []

  res.forEach(key => {
    const obj = {
      id: key.id,
      name: key.original_title,
      overview: key.overview,
      poster: ImageUrl + key.poster_path,
    }
    list.push(obj)
  });
  // console.log(list)
  return list
}





