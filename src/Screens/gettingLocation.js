import React from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import _ from "lodash";
import { AuthContext } from "../../App";

import {
    View
} from "react-native";

export function gettingLocation() {
    console.log("test");
    const [locations, setLocations] = React.useState([]);

    React.useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {

        let locationRef = firebase.database().ref("vender/");

        locationRef.on("value", (snapshot) => {
            let val = snapshot.val();

            let valToArray = _.map(val, (element) => {
                return { ...element };
            });
            //console.log("loc: " + valToArray);

            setLocations(valToArray);
            console.log("arr: " + locations);
            /*
            let size = valToArray.length;
            console.log("size = " + size);

            for (let i = 0; i < size; i++) {
                if (venders[i].location == undefined) {
                    console.log("False");
                }
                console.log("lat: " + venders[i].location);
            }
            */

            console.log("name: " + locations[0].locations.latitude);
        });
    }

    return (
        <View>
        </View>
    );

}