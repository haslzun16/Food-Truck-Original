/**
 * Orders Screen
 *
 * Allows the user to order food from a selected vendor
 *
 */



import * as React from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Component } from 'react';


const Orders = () => {
    return (
        <View style={styles.MainView} >
            <Text> Orders </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});



export default Orders;