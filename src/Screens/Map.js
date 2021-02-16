/**
 * Map Screen
 *
 * Shows the user a map with their location and the location of
 * nearby food trucks
 *
 */



import * as React from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Component } from 'react';


class Map extends Component {
    render() {
        return (
            <View>
                <Text> Map </Text>
            </View>
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
