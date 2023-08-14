import { Alert, StyleSheet, Text, TextInput, View } from "react-native"
import { Colors } from "../../constansts/colors"
import Button from "./Button"
import { useState } from "react"

//search form to use around the project

function SearchForm(props) {

  const [enteredText, setEnteredText] = useState('')

  function changeTextHandler(enteredText) {
    // props.onTextChange(enteredText)

    setEnteredText(enteredText)
  }

  function searchButtonHandler() {
    // console.log(enteredText)
    props.onSearchPressed(enteredText)
    setEnteredText('')
  }

  return (
    <View>
      {/* <Text style={styles.label}>Search Form component</Text> */}
      <View style={styles.form}>
        <TextInput style={styles.inputForm}
          onChangeText={changeTextHandler}
          value={enteredText} placeholder="Search"></TextInput>
        <Button onPress={searchButtonHandler}>Search</Button>
      </View>
    </View>

  )
}

export default SearchForm

const styles = StyleSheet.create({

  form: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 6,
  },
  inputForm: {
    width: 250,
    margin: 5,
    padding: 8,
    fontSize: 16,
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    textAlign: "center"
  },

})