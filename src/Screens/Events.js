/**
 * Events Screen
 *
 * Allows the user to view nearby events from food trucks
 *
 */

import * as React from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import * as firebase from "firebase";
import { AuthContext } from "../../App";
import _ from "lodash";

const Events = () => {
    const [announcements, setAnnouncements] = useState([]);
    const { getUserId } = React.useContext(AuthContext);
    let userId = getUserId();
  
    useEffect(() => {
        getAnnouncements();
      }, []);
    
      //method to getAnnouncements from Database
      const getAnnouncements = () => {
        let announcementRef = firebase.database().ref("announcements/");
        announcementRef.on("value", (snapshot) => {
          let val = snapshot.val();
    
          let valToArray = _.map(val, (element) => {
            
            return { ...element };
          });
            
          console.log(valToArray);
          setAnnouncements(valToArray)
        });
      };

      //delete old announcements 
    const deleteOldAnnouncements = () =>{
      now = Date.now();
      let ref = firebase.database().ref("announcements/");
      var cutoff = now - 120000;
      var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
      var listener = old.on('child_added', function(snapshot) {
      snapshot.ref.remove();
      });
    };
    //used to call deleteOldAnnouncements every minute 
      setInterval(deleteOldAnnouncements, 60000);

    return (
        <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>
        <View style={styles.MainView} >
            <View style={styles.Top} >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                <Text style={styles.headerText}> Announcements </Text>
                </View>
            </View>

            <View style={styles.Bottom}>
            <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          data={announcements}
          renderItem={({ item }) => (
            <View>
              
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#F5F5F5",
                    marginTop: 10,
                    borderRadius: 20,
                  }}
                >
                  

                  <View
                    style={{ flex: 1, flexDirection: "column", }}
                  >
                    {/* Vender announcment */}
                    <Text style={styles.vendername}>{item.vendorname}</Text>

                    <View style={{ flexDirection: "row" }}></View>

                    {/* vendor name */}
                    <Text style={styles.announcementPost}>{item.announcement}</Text>

                    {/* Food Truck Distance */}
                    {/* <Text style={styles.flatListItem3}>{item.description}</Text> */} 
                  </View>
                </View>
             

              {/* Line that separates Food Trucks */}

              <View style={{ height: 1, backgroundColor: "#F5AF19" }} />
            </View>
          )}
        />
            </View>
        </View>
      </LinearGradient>
        );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2193b0',
    },

    MainView: {
        flex: 1,
        alignContent: 'center',
        height: 100
    },

    Top: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '8%',
        color: '#fff',
        borderColor: '#FC5976',
        borderBottomWidth: 1,
        backgroundColor: 'yellow',

    },
    headerText: {
        color: 'black',
        marginTop: 10,
        fontSize: 28,

    },
    content:{
       height:'100%',
       //backgroundColor: 'red',
       flexDirection: 'column',
       justifyContent: 'space-around',
       alignItems: 'center'
    },
    Bottom: {
        height: "90%",
        width: "100%",
        //backgroundColor: 'blue'
      },
      announcementPost: {
        color: "black",
        fontSize: 17,
        //textAlign: "center",
        marginLeft: 15,
        marginTop: 5
      },
      vendername: {
        color: "black",
        //paddingRight: 20,
        //marginTop: 5,
        marginLeft: 15,
        fontSize: 22,
        //justifyContent: "center",
        //flexDirection: "row",
        marginTop: "auto",
        //textAlign: 'center',
       
       
       
      },
});

export default Events;
