/**
 * Map Screen
 *
 * Shows the user a map with their location and the location of
 * nearby food trucks
 *
 */



//import * as React from 'react';
import React from "react";
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
import { Component } from 'react';
import MapView from "react-native-maps";


class Map extends Component {
    render() {
        return (
            <MapView
                style={{
                    flex: 1
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignContent: 'center',
    },
});

export default Map;
