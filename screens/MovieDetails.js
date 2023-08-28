import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Alert } from 'react-native'
import { Colors } from '../constants/colors'
import { View } from 'react-native'
import Button from '../components/UI/Button'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'
import { useCallback, useState, useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton'
import { Movie, MovieSave } from '../models/location'
import { insertMovie } from '../util/database'

// screen to add location and photos

function MovieDetail({ route, navigation }) {

  const [name1, setName1] = useState(route.params.movieName)
  const [movieid, setId] = useState(route.params.movieId)
  const [poster, setPoster] = useState(route.params.moviePoster)
  const [pickedLocation, setPickedLocation] = useState()
  const [selectedImage, setSelectedImage] = useState()

  // const name = route.params.movieName
  // const overview = route.params.movieOverview

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri)

  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  // function pressedHandler() {
  //   console.log(pickedLocation)
  //   console.log(selectedImage)

  // }

  async function save(newMovie) {
    await insertMovie(newMovie)
  }

  const saveToDatabase = useCallback(() => {
    if (!pickedLocation || !selectedImage) {
      Alert.alert("no location and/or image is picked", 'please add location and/or image')
      return

    }

    const newMovie = new MovieSave(name1, poster, selectedImage, pickedLocation, movieid)

    console.log(newMovie)

    save(newMovie)




  }, [navigation, pickedLocation, selectedImage])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={saveToDatabase}></IconButton>
    })
  }, [navigation, saveToDatabase])




  return (<>

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.info}>
          <Image source={{ uri: poster }} style={styles.poster}></Image>
          <Text style={styles.title}>{name1}</Text>
        </View>
        {/* <Button onPress={pressedHandler}>press me</Button> */}
        <LocationPicker onPickLocation={pickLocationHandler}></LocationPicker>

        <ImagePicker onTakeImage={takeImageHandler}></ImagePicker>
      </ScrollView>
    </SafeAreaView>

  </>
  )

}

export default MovieDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,

  },
  poster: {
    width: '40%',
    height: 200,
    borderRadius: 5,
  },
  info: {
    flexDirection: 'row',
    padding: 6,
  }, name: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "60%",
  },
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 14,
    color: Colors.primaryLight,
    // flexDirection: "column",
    justifyContent: 'center',
    width: "60%",


  }
}
)

