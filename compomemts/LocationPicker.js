import { StyleSheet, View, Alert, Image, Text } from "react-native"
import Button from "./UI/Button"
import { Colors } from "../constants/colors"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import { useEffect, useState } from "react"
import { getAddress, getMapPreview } from "../util/location"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"

// component to pick up location of the user to add to movie profile

function LocationPicker({ onPickLocation }) {

  const isFocused = useIsFocused()

  const navigation = useNavigation()
  const route = useRoute()


  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
  const [pickedLocation, setPickedLocation] = useState()
  const [humanAddress, setHumanAddress] = useState('no address yet')



  useEffect(() => {

    if (isFocused && !!route.params.pickedLat) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }

      setPickedLocation(mapPickedLocation)
    }

  }, [route, isFocused])

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        setHumanAddress(address)

        onPickLocation({ ...pickedLocation, address: address })
      }

    }

    handleLocation()

  }, [pickedLocation, onPickLocation])

  async function verifyPermission() {

    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "Please grant permissions to use this app")
      return false
    }

    return true
  }

  async function getLocationHandler() {

    const hasPermission = await verifyPermission()
    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  function pickMapHandler() {
    navigation.navigate("Map")
  }



  let locationPreview = <Text>no location was added yet </Text>


  if (pickedLocation) {
    locationPreview = <Image style={styles.mapPreviewImage} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}></Image>


  }




  return <View style={styles.container}>
    <View style={styles.mapPreview}>
      {locationPreview}
    </View>
    <View style={styles.addressContainer}>
      <Text style={styles.address}>
        {humanAddress}
      </Text>
    </View>
    <View style={styles.actions}>
      <Button onPress={getLocationHandler} icon='navigate-outline'>Locate user</Button>
      <Button onPress={pickMapHandler} icon='map-outline'>Pick On Map</Button>
    </View>
  </View>

}

export default LocationPicker

const styles = StyleSheet.create({
  container: {

  },
  mapPreview: {
    height: 200,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary700,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  address: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: Colors.primaryLight,
    fontSize: 16,
  },
  addressContainer: {
    alignItems: "center",
  }
})