import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList } from "react-native"
import { Colors } from "../constansts/colors"
import SearchForm from "../compomemts/UI/SearchForm"
import { useEffect, useState } from "react"
import MoviePreview from "../compomemts/MoviePreview"
import { searchMovies, popularMovies } from "../util/MovieDb"


// main screen 
function AllMovies({ navigation }) {

  const [list, setList] = useState([])
  const [name, setName] = useState('')



  useEffect(() => {
    // console.log("name")
    getMovie()

  }, [name])

  useEffect(() => {

    if (list.length == 0 || name.length == 0) {
      getMov()
    }


  }, [name])


  async function getMov() {
    const data = await popularMovies()
    setList(data)
    // console.log(name)
  }


  async function getMovie() {
    const data = await searchMovies(name)
    setList(data)
  }

  function searchButtonHandler(enteredMovie) {

    setName(enteredMovie)

  }

  function renderMovieTile(itemData) {
    function pressHandler() {
      navigation.navigate('MovieDetail', {
        movieId: itemData.item.id,
        moviePoster: itemData.item.poster,
        movieName: itemData.item.name,
        movieOverview: itemData.item.overview,
      })
    }

    return (
      <MoviePreview name={itemData.item.name} poster={itemData.item.poster} overview={itemData.item.overview} onPress={pressHandler}></MoviePreview>
    )

  }


  return (
    <SafeAreaView style={styles.base}>
      <SearchForm style={styles.form} onSearchPressed={searchButtonHandler}></SearchForm>


      <FlatList style={styles.list} data={list} renderItem={renderMovieTile} />

    </SafeAreaView>
  )
}


export default AllMovies

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    padding: 6,
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.accent500,
  },
  list: {
    flex: 1,
    color: Colors.primaryLight,
  },
  form: {
    // flex: 3,

    borderBottomWidth: 10,
    borderBottomColor: Colors.primaryLight,
  }
}
)

