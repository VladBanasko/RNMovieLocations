// export class Movie {
//   constructor(id, title, poster, imageUri, location, movieid) {
//     this.id = id,
//       this.title = title
//     this.poster = poster
//     this.imageUri = imageUri
//     this.address = location.address
//     this.location = {
//       lat: location.lat, lng: location.lng
//     }
//     this.Movieid = movieid
//   }
// }

export class Movie {
  constructor(title, poster, imageUri, location, movieid) {

    this.title = title
    this.poster = poster
    this.imageUri = imageUri
    this.address = location.address
    this.location = {
      lat: location.lat, lng: location.lng
    }
    this.Movieid = movieid
  }
}
