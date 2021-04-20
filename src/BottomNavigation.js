/**
 * Bottom Navigation
 *
 * Navigation to the main app screens
 *
 */

import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./Screens/Home";
import Map from "./Screens/Map";
import Events from "./Screens/Events";
import MyPage from "./Screens/MyPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../App";
import { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import { useTheme } from '@react-navigation/native';


const BottomNavigation = () => {

    const { colors } = useTheme();

    const [setUp, assignSetUp] = useState()
    const { getUserId } = React.useContext(AuthContext);
    let userId = getUserId();

    useEffect(() => {
        navigateUser();
    }, []);

    const navigateUser = () => {

        let isSetUpRef = firebase.database().ref("users/" + userId + "/user");
        isSetUpRef.on("value", (snapshot) => {
            if (snapshot.exists()) {
                assignSetUp(false)
            }
            else {
                assignSetUp(true)
            }
        });
    };

const Tab = createBottomTabNavigator();
    return (
 
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: "#FFF",
           //   backgroundColor: colors.background
          },
          activeTintColor: "#FEAD44",
          inactiveTintColor: "#FC5976",
            }}
            screenOptions={({ route }) => ({
                tabBarButton: ['MyPage'].includes(route.name) && setUp == false
                    ? () => {
                        return null;
                    }
                    : undefined,
            })}
      >
        {/* First Tab and Screen */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarColor: "#009387",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="home"
                style={{ color: color }}
                size={26}
              />
            ),
          }}
        />
        {/* Second Tab and Screen */}
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: "Map",
            tabBarColor: "#009387",
            activeTintColor: "red",
            inactiveTintColor: "blue",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />
            ),
          }}
        />
        {/* Third Tab and Screen */}
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            tabBarLabel: "Announcements",
            tabBarColor: "#009387",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-star"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarLabel: "MyPage",
            tabBarColor: "#009387",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="truck" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}

export default BottomNavigation;
