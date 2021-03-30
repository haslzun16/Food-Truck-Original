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
 * npm install @react-native-firebase/database
 */

//imports
import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import * as firebase from 'firebase';
import { linear } from "react-native/Libraries/Animated/src/Easing";

class Map extends Component {


    /**
     * The vendor is the only user that has a MyPage.
     * There will be a update current location button that will get the users location(lat and long) and push it to the database.
    */

    /*
    * TODO
    * Look at the database and go into the foodtruck location.
    * populate the users map with food trucks(from the database) near them.
    */


    render() {
        var latitude = 0;
        var longitude = 77.0365; //-79.72228;

        /*database()
            .ref('vendor/1JRC2MPddCVrigMJoNOs2dCU3wL2/location')
            .once('latitude')
            .then(snapshot => {
                latitude = snapshot.val();
            });*/

        return (
            <MapView
                style={{ flex: 1 }}
                //shows users location
                showsUserLocation={true}
                //should follow the user if they move
                followsUserLocation={true}
                //button to zoom in on users current location
                //there is a bug with this button where the button does not show up unless you rotate the phone 
                showsMyLocationButton={true}
            >

                <Marker
                    coordinate={{ latitude, longitude }}
                //image={require("../../assets/orange-food-truck.png")}
                />

            </MapView>
        );
    }
}

export default Map;