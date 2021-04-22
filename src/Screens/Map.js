/**
 * Kalob Reinholz
 *
 * Last edited 4/22/2021
 * 
 * Shows the user a map with their location and the location of
 * nearby food trucks
 *
 * npm install -g react-native-cli
 * npm install react-native-maps
 * npm install @react-native-firebase/database
 * npm install --save react-native-open-maps    //https://www.npmjs.com/package/react-native-open-maps
 */

//imports

import MapView, { Marker, Callout } from "react-native-maps";
import * as firebase from 'firebase';
import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import { View, Text, Image, StyleSheet, } from "react-native";
import { Platform } from "react-native";
import { Linking } from "react-native";
import openMap from 'react-native-open-maps';

function Map() {

    //creating hook (locations is the variable, setlocations is assigning to locations)
    const [locations, setLocations] = useState([]);


    //calls the getLocation() method
    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {

        //goes in the database to the venders "tab"
        let locationRef = firebase.database().ref("vender/");

        //puts all the info from vendor tab into valToArray
        locationRef.on("value", (snapshot) => {
            let val = snapshot.val();

            //getting all the venders out of the database, if they do not have a location it inserts null into the array
            var tempArray = _.map(val, (element) => {
                if (element.location != undefined) {
                    return { ...element };
                }
            })

            //deletes all the nulls out of the array so that the food trucks can be made into markers
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i] == null) {
                    tempArray.splice(i, 1);
                    i--;
                }
            }

            //sets location hook
            setLocations(tempArray);

            //prints JSON on venders
            //console.log("tempArray: " + JSON.stringify(tempArray, null, 2));
        });
    }

    //method that opens the users phone and enters the food trucks number
    const dialCall = (number) => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:' + number;
        }

        else {
            phoneNumber = 'telprompt:' + number;
        }

        Linking.openURL(phoneNumber);
    };

    //method that opens maps on phone based on OS
    const goToTruck = (lat, lon, name) => {
        if (Platform.OS === 'android') {
            openMap({ latitude: lat, longitude: lon, end: lat + ", " + lon });
        }

        else {
            openMap({ latitude: lat, longitude: lon, query: lat + ", " + lon });
        }
    }


    return (
        <MapView
            style={{ flex: 1 }}

            //shows users location
            showsUserLocation={true}

            //button to zoom in on users current location
            //there is a bug with this button where the button does not show up unless you rotate the phone 
            showsMyLocationButton={true}
        >

            {
                locations.map((marker, i) => (
                    <Marker
                        key={i}

                        //creates the marker
                        coordinate={{
                            latitude: marker.location.latitude,
                            longitude: marker.location.longitude
                        }}

                        //use if you want the user to be able to call the truck when they click on it 
                        //onCalloutPress={() => { dialCall(marker.phone) }}

                        //use if you want the user to be able go the the food trucks location in their phone's map
                        onCalloutPress={() => { goToTruck(marker.location.latitude, marker.location.longitude, marker.FoodTruckName) }}
                    >
                        <Callout tooltip>
                            <View style={styles.bubble}>

                                <Text>
                                    <Image
                                        style={styles.image}
                                        //source={require("../../assets/FoodTrucks/FoodTruck1.jpg")}
                                        source={{ uri: marker.foodTruckImage }}
                                    />
                                </Text>

                                <Text style={styles.name}>{marker.FoodTruckName}</Text>

                                <Text>Food Type: {marker.FoodType}</Text>
                                <Text>Phone Number: {marker.phone}</Text>

                            </View>

                            <View style={styles.arrowBorder} />
                            <View styles={styles.arrow} />

                        </Callout>
                    </Marker>
                ))
            }



        </MapView>
    );
}

//mypage.js line 549
export default Map;

const styles = StyleSheet.create({
    map: {
        height: '100%'
    },

    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 200,
    },

    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },

    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },

    name: {
        fontSize: 16,
        marginBottom: 5,
    },

    image: {
        width: 200,
        height: 150,
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})