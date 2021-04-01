/**
 * Account Screen
 *
 * Shows the user's information
 * Allows CRUD operations
 * Settings Page
 *
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {
    Button,
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Component } from "react";

import { AuthContext } from "../../App";

import _ from "lodash";

import * as firebase from "firebase";

const Account = () => {

    const [users, setUsers] = React.useState([]);

    const { getUserId } = React.useContext(AuthContext);

    let userId = getUserId();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        let userRef = firebase.database().ref("vender/");

        userRef.on("value", (snapshot) => {
            let val = snapshot.val();

            let valToArray = _.map(val, (element) => {
                return { ...element };
            });

            setUsers(valToArray);

        });
    };












   /* componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }*/







    //const renderItem = ({ item, index }) => {
    return (
        <View style={styles.MainView}>
            <View style={styles.MainView2}>
                <Image
                    style={styles.profilePic}
                    source={require("../../assets/default.png")}
                    resizeMode={"cover"}
                />

            </View>
            <View>
                <TextInput
                    placeholder="Name"
                    style={styles.textInput}
                //onChangeText={text => setNewName(text)}
                //defaultValue={item.name}
                // editable={true}
                />

                <TextInput
                    //keyboardType="numeric"
                    placeholder="Email"
                    style={styles.textInput}
                //onChangeText={text => setNewPrice(text)}
                // defaultValue={item.price}
                // editable={true}
                />

                <TextInput
                    placeholder="Phone Number"
                    style={styles.textInput}
                //onChangeText={text => setNewDescription(text)}
                //defaultValue={item.description}
                // editable={true}
                />

                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry={true}
                //onChangeText={text => setNewDescription(text)}
                //defaultValue={item.description}
                // editable={true}
                />

                <View style={styles.view2}>
                    {/* If correct credentials go to the homepage via bottom navigation */}
                    <TouchableOpacity
                        onPress={() => onLoginPress()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );

};
//};

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
    },

    MainView2: {
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
    },

    profilePic: {
        height: 100,
        width: 100,
        margin: 12,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 0.5,
        borderColor: "#F5F5F5",
    },

    textInput: {
        alignSelf: 'stretch',
        padding: 10,
        marginLeft: 50,
        borderBottomColor: '#000',
        margin: 5,
        marginRight: 50,

        borderBottomColor: '#000',
        borderBottomWidth: 2 
    },

    view2: {
        marginTop: 0,
        alignItems: "center",
        padding: 10,
    },

    button: {
        width: 200,
        height: 60,
        marginTop: 30,
        borderRadius: 30,
        backgroundColor: "#FEAD44",
    },

    buttonText: {
        position: "absolute",
       // paddingLeft: 60,
        fontSize: 18,
        textAlign: "center",
        margin: 15,
        color: "#FFFFFF",
        alignSelf: "center"
    },

});

export default Account;
