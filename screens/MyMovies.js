import { Image, SafeAreaView, StyleSheet, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { fetchMovies } from '../util/database'
import { FlatList } from 'react-native'
import { Colors } from '../constants/colors'
import MoviePreviewFav from '../components/UI/MoviePreviewFav'

function MyMovies({ navigation }) {

  const [list, setList] = useState([])

  const isFocused = useIsFocused()




  useEffect(() => {
    if (isFocused) {
      async function loadMovies() {
        const data = await fetchMovies()
        setList(data)
      }

      loadMovies()
    }

  }, [navigation, isFocused])


  function renderList(itemData) {

    // console.log(list)
    console.log(itemData.item)

    return (
      <MoviePreviewFav
        id={itemData.item.id}
        title={itemData.item.title}
        movieId={itemData.item.Movieid}
        poster={itemData.item.poster}
        image={itemData.item.imageUri}
        location={itemData.item.location}
        address={itemData.item.address}
      ></MoviePreviewFav>
    )
  }


  return (<SafeAreaView style={styles.container}>
    {/* <Text style={styles.list}>My Movies Screen</Text> */}
    <FlatList style={styles.list} data={list} renderItem={renderList} />
  </SafeAreaView>
  )

}

export default MyMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    // padding: 6,
    flexDirection: "column",
  },
  tile: {
    // flexDirection: 'row',
    // backgroundColor: Colors.primary100,
    // color: Colors.primaryLight,
  },
  list: {

    color: Colors.primaryLight,
  }
})