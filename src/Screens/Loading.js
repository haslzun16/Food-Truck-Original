import React from "react";
import { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  View,
  Modal,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase";
import { AuthContext } from "../../App";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SetUp from "./SetUp";
import BottomNavigation from "../BottomNavigation";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

function Loading({ navigation }) {
  // const [setUp, assignSetUp] = useState();
  // const [visible, setVisible] = useState();
  const Stack = createStackNavigator();
  const { getUserId } = React.useContext(AuthContext);
  let userId = getUserId();

  useEffect(() => {
    navigateUser();
  }, []);

  const navigateUser = () => {
    let isSetUpRef = firebase.database().ref("vender/" + userId + "/isSetUp");

    isSetUpRef.on("value", (snapshot) => {
      let val = snapshot.val();
      console.log(val);

      if (val == false) {
        navigation.navigate("SetUp");
      } else {
        navigation.navigate("BottomNavigation")
      }
    });
  };

  return (
    // <AnimatedLoader

    //   //overlayColor="rgba(255,255,255,0.75)"
    //   source={require("../../assets/LoadingImage.json")}
    //   animationStyle={styles.lottie}
    //   speed={1}
    // >
    //   <Text>Doing something...</Text>
    // </AnimatedLoader>
    null
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default Loading;
