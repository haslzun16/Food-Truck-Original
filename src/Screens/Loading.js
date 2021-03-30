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

function Loading() {
    const [setUp, assignSetUp] = useState()
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
            console.log(val)

            if (val == false) {
                assignSetUp(false)
            }
            else {
                assignSetUp(true)
            }
        });
    };

    return (

        <Stack.Navigator>
            {setUp == true ? (
                <Stack.Screen
                    name="BottomNavigation"
                    component={BottomNavigation}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="SetUp"
                        component={SetUp}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="BottomNavigation"
                        component={BottomNavigation}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>

    );
};

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
});

export default Loading;
