import { Image, Pressable, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { Colors } from "../constants/colors"



// component to show small movie preview in a list on a main page

function MoviePreview({ poster, name, overview, onPress },) {

  return (
    <View style={styles.root}>
      <Pressable style={({ pressed }) => [styles.press, pressed ? styles.tilePressed : null]} onPress={onPress}>
        <View style={styles.container}>
          <Image source={{ uri: poster }} style={styles.image}></Image>
          <View style={styles.info}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{overview}</Text>
          </View>
        </View>
      </Pressable>
    </View>)
}

export default MoviePreview

const styles = StyleSheet.create({
  root: {
    padding: 6,

  },
  press: {
    // backgroundColor: Colors.primary700,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.primary700,

  },
  tilePressed: {
    opacity: "70%"
  },
  container: {
    alignContent: "space-between",
    flexDirection: "row",

  },
  image: {
    flex: 2,
    width: '50%',
    height: 250,
    borderRadius: 5,
  },
  info: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "50%",
    padding: 4,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    color: Colors.primaryLight,
  },
  text: {
    overflow: "hidden",
    color: Colors.primaryLight,

  }

})