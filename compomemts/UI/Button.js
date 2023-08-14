import { Pressable, StyleSheet, Text } from "react-native"
import { Colors } from "../../constants/colors"
import { Ionicons } from '@expo/vector-icons'


function Button({ onPress, children, styleAdditional, icon }) {
  return <Pressable style={({ pressed }) => [styles.button, styleAdditional, pressed && styles.pressed]} onPress={onPress}>
    <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primaryLight} />
    <Text style={styles.text}>{children}</Text>
  </Pressable>
}

export default Button

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.primary700
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: Colors.primaryLight

  },
  icon: {
    marginRight: 6,
  }
})