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


const Account = ({ navigation }) => {

    const [newName, setNewName] = useState(" ");

    const [newPhone, setNewPhone] = useState(" ");

    const { signOut } = React.useContext(AuthContext);

    const signout = () => {
        signOut()
        console.log("User Signed Out");
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

            let val = snapshot.val();

            let valToArray = _.map(val, (element) => {
                return { ...element };
            });
            console.log(users)

        });
    };

    const updateMenu = () => {

        const nameRef = firebase.database();
        nameRef.ref("vender/" + userId)
            .update({ Fullname: newName })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        const phoneRef = firebase.database();
        phoneRef.ref("vender/" + userId)
            .update({ phone: newPhone })
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };

    /* componentDidMount() {
         const { currentUser } = firebase.auth()
         this.setState({ currentUser })
     }*/

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

                <Text style={styles.text}>
                    Name
                </Text>

                <TextInput
                  //  placeholder="Name"
                    style={styles.textInput}
                    onChangeText={text => setNewName(text)}
                    defaultValue={users.Fullname}
                    // editable={true}
                />

                <Text style={styles.text}>
                    Email
                </Text>

                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    //onChangeText={text => setNewPrice(text)}
                    // defaultValue={item.price}
                />

                <Text style={styles.text}>
                    Phone Number
                </Text>

                <TextInput
                    keyboardType="numeric"
                    //placeholder="Phone Number"
                    style={styles.textInput}
                    onChangeText={text => setNewPhone(text)}
                    defaultValue={users.phone}
                />

                <Text style={styles.text}>
                    Password
                </Text>

                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry={true}
                    //onChangeText={text => setNewDescription(text)}
                    //defaultValue={item.description}
                />

                <View style={styles.view2}>

                    <TouchableOpacity
                        onPress={() => signout()}
                       // style={styles.button}
                    >
                        <Text >Sign Out</Text>
                    </TouchableOpacity>

                    {/* If correct credentials go to the homepage via bottom navigation */}
                    <TouchableOpacity
                        onPress={() => updateMenu()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    );

};

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

    text: {
        alignSelf: 'stretch',
        paddingTop: 10,
        marginLeft: '7%',
        margin: 0,
     //   marginRight: 50,
    },

    textInput: {
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#FEAD44",
        borderRadius: 30,
        padding: 8,
        paddingHorizontal: 20,
        margin: 10,
        width: "90%",
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
        marginTop: "auto",
        //flex: 1,
       // justifyContent: "flex-end",
    },

    buttonText: {
        position: "absolute",
        // paddingLeft: 60,
        fontSize: 18,
        textAlign: "center",
        margin: 15,
        color: "#FFFFFF",
        alignSelf: "center",
        //marginTop: "auto",
        //flex: 1,
        //justifyContent: "flex-end",
    },

});

export default Account;