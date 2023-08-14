import { Alert, Image, StyleSheet, Text, View } from "react-native"
import Button from "./UI/Button"
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../constansts/colors"


// component to use around project , specificaly to take use camerta to take photos

function ImagePicker({ onTakeImage }) {

  const [pickedImage, setPickedImage] = useState()

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "Please grant permissions to use this app")
      return false
    }

    return true
  }


  async function takeImageHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    // console.log(image.uri)
    // console.log(image.assets[0].uri)

    setPickedImage(image.uri)
    onTakeImage(image.uri)
  }

  let imagePreview = <Text >No image taken yet</Text>

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image}></Image>
  }

  return <View>
    <View style={styles.imagePreview}>{imagePreview}</View>
    <Button onPress={takeImageHandler} styleAdditional={styles.button} icon='camera-outline'>
      Take image
    </Button>
  </View>
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    // width: '100%',
    height: 200,
    // padding: 6,
    margin: 6,
    // marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary700,
    borderRadius: 4,

  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  button: {
    marginHorizontal: 6,
  }
})