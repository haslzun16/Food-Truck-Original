/**
 * Events Screen
 *
 * Allows the user to view nearby events from food trucks
 *
 */



import * as React from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Component } from 'react';


class Events extends Component {
    render() {
        return (
            <View>
                <Text> Events </Text>
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

export default Events;