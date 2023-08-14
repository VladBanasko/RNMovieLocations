import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllMovies from './screens/AllMovies';
import MyMovies from './screens/MyMovies';
import MovieDetail from './screens/MovieDetails';
import { Colors } from './constansts/colors'
import { Ionicons } from "@expo/vector-icons"
import Map from './screens/Map';
import { useEffect } from 'react';
import { init } from './util/database';
import { BlurView } from 'expo-blur';



const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()




function MoviesOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.primary700 },
    headerTintColor: "white",
    tabBarStyle: {
      backgroundColor: Colors.primaryDark,

    },

    tabBarActiveBackgroundColor: Colors.primary800,


  })}>
    <BottomTabs.Screen component={AllMovies} name='AllMovies' options={{
      title: "All Movies",
      tabBarLabel: "All Movies",
      tabBarIcon: ({ color, size }) =>
        (<Ionicons name='videocam-outline' size={20} color={Colors.primary500}></Ionicons>)
    }}></BottomTabs.Screen>

    <BottomTabs.Screen component={MyMovies} name='MyMovies' options={{
      title: "My Movies",
      tabBarLabel: "My Movies",
      tabBarIcon: ({ color, size }) =>
        (<Ionicons name='list-circle' size={20} color={Colors.primary500}></Ionicons>),

    }}></BottomTabs.Screen>
  </BottomTabs.Navigator>
}

export default function App() {

  useEffect(() => {
    init()
  }, [])

  return (<>
    <StatusBar style='auto'></StatusBar>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryDark },
        headerTintColor: Colors.primaryLight,
        contentStyle: { backgroundColor: Colors.gray700 }
      }}>
        <Stack.Screen name='MoviesOverview' component={MoviesOverview} options={{ headerShown: false }} ></Stack.Screen>
        <Stack.Screen name='MovieDetail' component={MovieDetail} ></Stack.Screen>
        <Stack.Screen name='Map' component={Map}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>


  </>);
}

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute'
  }
})
