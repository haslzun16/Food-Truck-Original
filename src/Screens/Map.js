/**
 * Kalob Reinholz
 *
 * Last edited 3/7/21
 *
 * Shows the user a map with their location and the location of
 * nearby food trucks
 *
 * npm install -g react-native-cli
 * npm install react-native-maps
 */

//imports
import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";

let x = 36.2530474;
class Map extends Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1,
        }}
        //shows users location
        showsUserLocation={true}
        //should follow the user if they move
        followsUserLocation={true}

        //below allows us to enter a specific location using lat and long
        /*
            initialRegion={{
                latitude: 37.78825,
                longitude: -79.7231278, //-122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            */
      />
    );
  }
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignContent: "center",
  },
});

export default Map;
