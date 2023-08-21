import { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import IconButton from '../components/UI/IconButton'


// screen to manualy choose location to add
function Map({ navigation }) {

  const [selectedLocation, setSelectedLocation] = useState()
  const region = {
    // latitude: 37.78,
    // longitude: -122.43,
    latitude: 43.655108,
    longitude: -79.371420,
    latitudeDelta: 0.09,
    longitudeDelta: 0.05
  }

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation({ lat: lat, lng: lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("no location picked", 'please tap to choose location')
      return
    }
    navigation.navigate("MovieDetail", { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })



  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}></IconButton>
    })
  }, [navigation, savePickedLocationHandler])

  return <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
    {selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}
  </MapView>
}

export default Map

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

