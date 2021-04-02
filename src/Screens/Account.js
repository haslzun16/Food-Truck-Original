/**
 * Account Screen
 *
 * Shows the user's information
 * Allows CRUD operations
 * Settings Page
 *
 */

import * as React from "react";
import { useState, useEffect, useContext } from "react";
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



    const user = useContext(AuthContext)

    async function logOut() {
        try {
            await AuthContext().signOut()
        } catch (e) {
            console.error(e)
        }
    }


    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);


    const { getUserId } = React.useContext(AuthContext);

    let userId = getUserId();

    const getUsers = () => {

        let userRef = firebase.database().ref("vender/" + userId);

        userRef.on('value', function (snapshot) {
            setUsers(snapshot.val());


            /*  let responselist = Object.values(snapshot.val())
              setVenders(responselist)
              console.log(snapshot.val())
              setLoading(true);*/




            //snapshot.forEach(function (data) {
            //  console.log("The " + data.id + " data is " + data.val());



            let val = snapshot.val();

            let valToArray = _.map(val, (element) => {
                return { ...element };
            });
            console.log(users)
            //console.log("THIS IS THE USER IDDDDDDDDDDDDDDDDDDD:   " + userId)

            // console.log("LET'S GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            // console.log(valToArray[2]);

            //     setVenders(val);
            //console.log("BYEEEEEEEEEEEEEEEEEEEEEEEEEEE") 
            // console.log(venders[2].FoodTruckName);
            // console.log("THIS IS THE WAY MY FRIEND :)")
            //      console.log(venders);
            //            console.log("WENJRKTMGREDF:        "+venders[0].FullName)

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
                defaultValue={users.Fullname}
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
                defaultValue={users.phone}
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

 <TouchableOpacity
                onPress={() => signout() }
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>

                    {/* If correct credentials go to the homepage via bottom navigation */}
                    <TouchableOpacity
                       // onPress={() => onLoginPress()}
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