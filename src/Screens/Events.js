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
    
      const getAnnouncements = () => {
        
        let announcementRef = firebase.database().ref("vender/" + userId + "/announcements");
    
        announcementRef.on("value", (snapshot) => {
          let val = snapshot.val();
    
          let valToArray = _.map(val, (element) => {
            return { ...element };
          });
          
          setAnnouncements(valToArray);
    
        });
      };
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
                    style={{ flex: 1, flexDirection: "column", height: 50 }}
                  >
                    {/* Food Truck Name */}
                    <Text style={styles.flatListItem2}>{item.announcement}</Text>

                    <View style={{ flexDirection: "row" }}></View>

                    {/* Food Truck Time
                    <Text style={styles.flatListItem3}>{item.price}</Text>

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
        flex:1,
        alignContent: 'center',
        height: 100
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
        marginTop: 20,
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
      flatListItem2: {
        color: "black",
        paddingLeft: 0,
        fontSize: 20,
      },
});

export default Events;
