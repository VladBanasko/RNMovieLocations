import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native"
import { Colors } from "../../constansts/colors"
import { getMapPreviewFav } from "../../util/location"
import { deleteMovie } from "../../util/database"

// tile for the list of saved movies location

function MoviePreviewFav({ title, id, poster, image, location, address, movieId }) {

  let locationPreview = <Image style={styles.mapPreviewImage} source={{ uri: getMapPreviewFav(location.lat, location.lng) }}></Image>


  async function del() {

    await deleteMovie(id)
  }


  function longPress() {
    del()

  }

  return (
    <Pressable onLongPress={longPress}>
      <View style={styles.root}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          <Image style={styles.poster} source={{ uri: poster }} />
        </View>
        <View style={styles.right}>
          <View style={styles.topRight}>
            <Text style={styles.address}>{address}</Text>
            {locationPreview}
          </View>
          <View style={styles.bottomRight}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>

        </View>


      </View></Pressable>)
}

export default MoviePreviewFav

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginHorizontal: 6,
    marginVertical: 6,
    // paddingVertical: 6,
    height: 300,
    backgroundColor: Colors.primary100,
    // borderWidth: 3,
    // borderColor: Colors.newGreen,
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    color: Colors.primaryLight,
  },
  left: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: Colors.newGreen,
  },
  right: {
    flex: 2,
    flexDirection: "column",
  },
  topRight: {
    flex: 1,
    padding: 3,
  },
  bottomRight: {
    flex: 1,
    padding: 3,
  },
  poster: {
    flex: 1,
    marginHorizontal: 3,
    // width: '50%',
    // height: 250,
    borderRadius: 5,
    margin: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,

  },
  mapPreviewImage: {
    width: "100%",
    height: "80%",
    borderRadius: 4,
    paddingBottom: 4,
  },
  address: {
    fontSize: 13,
    color: Colors.primaryLight,
    fontWeight: "bold",
  }
}) 