import React from "react";
import { useState, useEffect } from "react";
import {
  FlatList,
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// import * as firebase from "firebase";
// import _ from "lodash";

const FoodTruckDetails = ({ navigation, route }) => {
  // const [vender, setVender] = useState([]);

//uncomment this out when you are ready to get the data from user
  // useEffect(() => {
  //   getVenders();
  // }, []);

  //gets the venders data from the firebase
  // const getVenders = () => {
    
  //   let menuRef = firebase.database().ref("vender/" + vender);

  //   menuRef.on("value", (snapshot) => {
  //     let val = snapshot.val();

  //     let valToArray = _.map(val, (element) => {
  //       return { ...element };
  //     });
  //     console.log(valToArray)
      
  //     setVender(valToArray);

  //   });
  // };
  return (
    <View style={{ flex: 1, height: "30%" }}>
      <Image style={styles.ftPic} source={route.params.item.source} />

      <View style={{}}>
        <Text style={styles.ftName}>{route.params.item.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ftPic: {
    //	backgroundColor: 'pink',
    width: "100%",
    height: 200,
  },

  ftName: {
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    marginTop: "0%",
    color: "black",
  },
});

export default FoodTruckDetails;
