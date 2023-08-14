import * as SQLite from 'expo-sqlite'
import { Movie } from '../models/location'

const database = SQLite.openDatabase('movies.db')

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      poster TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address text not null,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      movieId INTEGER NOT NULL
    )`,
        [],
        () => { resolve },
        (_, error) => { reject(error) })
    })
  })

  return promise
}


export function insertMovie(movie) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`INSERT INTO movies (title, poster, imageUri, address, lat, lng, movieId) VALUES (?,?,?,?,?,?,?)`,
        [movie.title, movie.poster, movie.imageUri, movie.address, movie.location.lat, movie.location.lng, movie.Movieid],
        (_, result) => {
          console.log(result)
          resolve(result)
        },
        (_, error) => {
          reject(error)
        })
    })
  })

  return promise
}

export function fetchMovies() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM movies', [],
        (_, result) => {

          const movies = []


          for (const dp of result.rows._array) {
            movies.push(new Movie(dp.id, dp.title, dp.poster, dp.imageUri, { address: dp.address, lat: dp.lat, lng: dp.lng }, dp.movieId))

          }

          resolve(movies)
        },
        (_, error) => {
          reject(error)
        })
    })
  })

  return promise
}

export function deleteMovie(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('DELETE FROM movies WHERE movieId = ?', [id],
        (_, result) => {

          // console.log(movies)
          resolve("deleted")
        },
        (_, error) => {
          reject(error)
        })
    })
  })

  return promise
}