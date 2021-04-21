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
    Modal,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../App";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import * as firebase from "firebase";

const EditAccount = ({ navigation }) => {

    const [setUp, assignSetUp] = useState();
    const { signOut } = React.useContext(AuthContext);
    const { deleteAccount } = React.useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [cust, setCust] = useState([]);
    const [vend, setVend] = useState([]);
    const { getUserId } = React.useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);





    let userId = getUserId();

    const signout = () => {
        signOut()
        console.log("User Signed Out");
    }

    useEffect(() => {
        navigateUser();
    }, []);

    useEffect(() => {
        getCustomers();
    }, []);

    useEffect(() => {
        getVendors();
    }, []);

    useEffect(() => {
        test();
    }, [users]);


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


    //Get the customers
    const getCustomers = () => {
        let userRef = firebase.database().ref("users/" + userId);
        userRef.on('value', function (snapshot) {
            setCust(snapshot.val());
        });
    };

    //Get the vendors
    const getVendors = () => {
        let userR = firebase.database().ref("vender/" + userId);
        userR.on('value', function (snapshot) {
            setVend(snapshot.val());
        });
    };


    //Gets the info based on if the user is a customer or a vendor
    const test = () => {
        if (setUp == true) {
            setUsers(vend);
        } else {
            setUsers(cust);
        }
        console.log("LOOKING");
        console.log(users);
    }


    const deleteaccount = () => {
        deleteAccount()

        if (setUp == true) {
            let accountRef = firebase
                .database()
                .ref("vender/" + userId);
            //Deleting the user
            accountRef.remove().then(() => {
                // User deleted successfully
                console.log('item deleted successfully')
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log('an error occurred!')
            });
        } else {
            let accountRef = firebase
                .database()
                .ref("users/" + userId);
            //Deleting the user
            accountRef.remove().then(() => {
                // User deleted successfully
                console.log('item deleted successfully')
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log('an error occurred!')
            });
        }
        console.log("User Account Deleted");
    }



    const updatePassword = () => {

        setModalVisible(false);

/*        var credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            providedPassword
        );

        if (currentPassword !== credential) {
            alert("Passwords don't match.");
            return;
        }*/

        if (newPassword.length < 6) {
            alert("Password is too short.")
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Passwords don't match.");
            return;
        }

        var user = firebase.auth().currentUser;

        user.updatePassword(confirmNewPassword).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });

    };



    accountDeletionAlert = () => {
/*        Alert.alert(
            'Are you sure you want to delete your account?',
            [
                { text: 'Yes', onPress: () => deleteaccount },
                { text: 'No', onPress: () => console.log('Canceled'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );*/

        Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
            { text: 'Yes', onPress: () => deleteaccount() },
            { text: 'No', onPress: () => console.log('Canceled'), style: 'cancel' },
    ],
        { cancelable: true });

    }





    return (
        <LinearGradient colors={["#F5AF19", "#FC5976"]} style={styles.MainView}>



            <Modal visible={modalVisible}>
                <View style={styles.modal}>

                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput2}
                        placeholder="Current Password"
                        value={currentPassword}
                        onChangeText={(text) => setCurrentPassword(text)}
                    />

                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput2}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                    />

                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput2}
                        placeholder="Cofirm New Password"
                        value={confirmNewPassword}
                        onChangeText={(text) => setConfirmNewPassword(text)}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.view2}>
                            {/* Close and Cancel the Modal */}
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.buttonModal}
                            >
                                <Text style={styles.buttonTextModal}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view2}>
                            {/* Add Profile Image to the database */}
                            <TouchableOpacity
                                onPress={() => updatePassword()}
                                style={styles.buttonModal}
                            >
                                <Text style={styles.buttonTextModal}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



            <View style={styles.MainView2}>

                    <Image
                        style={styles.profilePic}
                        source={{ uri: users.profileImage }}
                    />

                <Text
                    style={styles.nameText}>
                    {users.Fullname}
                </Text>


            </View>
            <View>

                <View style={styles.view2}>

                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => navigation.navigate("EditAccount")}>
                        <MaterialCommunityIcons
                            name="account-outline"
                            style={{
                                //alignSelf: "center",
                                marginTop: 5,
                               // paddingLeft: 14,
                                width: 35,
                                height: 35,
                                color: "black"
                            }}
                            size={26}
                            Account
                        ></MaterialCommunityIcons>
                        <Text style={styles.accountText}
                        >Edit Profile</Text>
                </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.accountText}
                        >Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newButton}>
                        <Text style={styles.accountText}
                        >About</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => signout()}
                    >
                        <Text style={styles.accountText}>Sign Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => accountDeletionAlert()}
                    >
                        <Text style={styles.accountText}>Delete Account</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </LinearGradient>

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
        alignSelf: 'center',
    },

    text: {
        alignSelf: 'stretch',
        paddingTop: 10,
        marginLeft: '7%',
        margin: 0,
        color: 'white'
    },

    textInput: {
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#FEAD44",
        borderRadius: 30,
        padding: 8,
        paddingHorizontal: 20,
        marginTop: 'auto',
        width: "90%",
    },

    textInput2: {
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#FEAD44",
        borderRadius: 30,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 50,
        width: "90%",
        color: 'black',
        fontSize: 16
    },

    view2: {
        marginTop: 0,
        alignItems: "center",
        padding: 10,
        height: '90%',
    },

    button: {
        width: 200,
        height: 55,
        marginTop: 30,
        borderRadius: 30,
        backgroundColor: "#FEAD44",
        marginTop: "auto",
        marginTop: 10
    },

    buttonText: {
        position: "absolute",
        fontSize: 18,
        textAlign: "center",
        margin: 15,
        color: "#FFFFFF",
        alignSelf: "center",
    },

    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    modal2: {
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
    },

    buttonModal: {
        width: 100,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#FEAD44",
    },

    buttonTextModal: {
        fontSize: 18,
        textAlign: "center",
        margin: 5,
        color: "#FFFFFF",
    },

    accountText: {
        fontSize: 18,
        color: "white",
        margin: 5,
    },

    newButton: {
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        width: '105%',
        marginTop: '4%',
        marginBottom: '4%',
        flexDirection: "row"
    },

    nameText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    }

});

export default EditAccount;