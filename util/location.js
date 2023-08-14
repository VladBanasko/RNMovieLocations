// const GOOGLE_API_KEY = 'AIzaSyB9BqslSqgT-QjiHXiKHDvZXz0Cf_KXlwU'
const GOOGLE_API_KEY = 'AIzaSyClpWE9FFY29y39tUMBUVDBHLmsCJgIQc4'


export function getMapPreview(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`

  return url
}

export function getMapPreviewFav(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=11&size=200x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`

  return url
}






export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('failed to fetch address')
  }

  const data = await response.json()
  const address = data.results[0].formatted_address
  return address
}