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
            <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>
        <View style={styles.MainView} >
            <View style={styles.Top} >

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                    }}>
                <Text style={styles.headerText}> Events </Text>
                </View>
            </View>

            <View style={styles.content}>
               <Text style = {{fontSize: 30,}}>event 1 </Text> 
               <Text style = {{fontSize: 30,}}>event 2 </Text>
               <Text style = {{fontSize: 30,}}>event 3 </Text>
               <Text style = {{fontSize: 30,}}>event 4 </Text>
               <Text style = {{fontSize: 30,}}>event 5 </Text>
               <Text style = {{fontSize: 30,}}>event 6 </Text>
               <Text style = {{fontSize: 30,}}>event 7 </Text>
               <Text style = {{fontSize: 30,}}>event 8 </Text>

            </View>

            </View>

      </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2193b0',
    },

    MainView: {
        flex:1,
        alignContent: 'center',
    },

    Top: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        color: '#fff',
        borderColor: '#FC5976',
        borderBottomWidth: 1,
        backgroundColor: 'yellow',

    },
    headerText:{
        color: 'black',
        marginTop: 40,
        fontSize: 28,
        
    },
    content:{
       height:'100%',
       //backgroundColor: 'red',
       flexDirection: 'column',
       justifyContent: 'space-around',
       alignItems: 'center'
    }
});

export default Events;