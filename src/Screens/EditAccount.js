/**
 * Account Screen
 *
 * Shows the user's information
 * Allows CRUD operations
 * Settings Page
 *
 */

import * as React from "react";
import { useState, useEffect} from "react";
import {
    Button,
    View,
    Text,
    Modal,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../App";

import _ from "lodash";

import * as firebase from "firebase";

import * as ImagePicker from "expo-image-picker";

const EditAccount = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleName, setModalVisibleName] = useState(false);
    const [setUp, assignSetUp] = useState(); 
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [tempImage, setTempImage] = useState("");
    const [users, setUsers] = useState([]);
    const [cust, setCust] = useState([]);
    const [vend, setVend] = useState([]);
    const { getUserId } = React.useContext(AuthContext);
    const [email, setEmail] = useState("");

    let userId = getUserId();

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

    const getInfo = () => {

        let infoRef = firebase.database().ref("vender/" + userId);

        infoRef.on('value', function (snapshot) {

            setInfo(snapshot.val());

        });

    };
     
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setTempImage(result.uri);
        }
    };

    const insertProfileImage = (url) => {
        setModalVisible(false);
        if (setUp == true) {
        let profileImageRef = firebase.database().ref("vender/" + userId);
        let createdProfileImage = profileImageRef
        let profileImage = {
            profileImage: url,
        };
        createdProfileImage
            .update(profileImage)
            .then((res) => {
                setTempImage("");
            })
            .catch((err) => console.log(err));
        } else {
            let profileImageRef = firebase.database().ref("users/" + userId);
            let createdProfileImage = profileImageRef
            let profileImage = {
                profileImage: url,
            };
            createdProfileImage
                .update(profileImage)
                .then((res) => {
                    setTempImage("");
                })
                .catch((err) => console.log(err));
        } 
    };

    // T0-Do you need to add a loading screen because the uploading image kinda takes time to upload
    //method to upload image to database then it downloads the image and sends the url to insertmenu method
    const uploadImageToStorage = async () => {
        let response = await fetch(tempImage);
        let blob = await response.blob();

        firebase
            .storage()
            .ref()
            .child(userId + "/ProfileImages/" + users.Fullname)
            .put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then(url => {
                        console.log(' * new url', url)
                        insertProfileImage(url);
                    })
            });
    };

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

    //Gets the customers
    const getCustomers = () => {
        let userRef = firebase.database().ref("users/" + userId);
        userRef.on('value', function (snapshot) {
            setCust(snapshot.val());
        });
    };

    //Gets the vendors
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
        //Sets the value of the field to properly update each individual field
        setNewName(users.Fullname);
        setNewPhone(users.phone);

        var user = firebase.auth().currentUser;

            user.providerData.forEach(function (profile) {
                console.log("  Email: " + profile.email);
                setEmail(profile.email);
            });
    }
      
    const updateUser = () => {
        if (setUp == true) {
        const nameRef = firebase.database();
            nameRef.ref("vender/" + userId)
                .update({ Fullname: newName, phone: newPhone })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        } else {
            const nameRef = firebase.database();
            nameRef.ref("users/" + userId)
                .update({ Fullname: newName })
                .then(res => console.log(res))
                .catch(err => console.log(err));

            const phoneRef = firebase.database();
            phoneRef.ref("users/" + userId)
                .update({ phone: newPhone })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } 

        var user = firebase.auth().currentUser;

        user.updateEmail(email).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });

    };

    return (
        <LinearGradient colors={["#F5AF19", "#FC5976"]} style={styles.MainView}>

            <Modal visible={modalVisible}>
                <View style={styles.modal}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    <Image
                        source={{ uri: tempImage ? tempImage : "../../assets/NoImage.png" }}
                        style={{ width: 200, height: 200 }}
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
                                onPress={() => uploadImageToStorage()}
                                style={styles.buttonModal}
                            >
                                <Text style={styles.buttonTextModal}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.MainView2}>
                <TouchableOpacity
                      onPress={() => setModalVisible(true)}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: users.profileImage }}
                    />
                 
                </TouchableOpacity>
            </View>
            <View>
                 
                <Text style={styles.text}>
                    Name
                </Text>

                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setNewName(text)}
                     defaultValue={users.Fullname}
                    //defaultValue={newName}
                />


                <Text style={styles.text}>
                    Email
                </Text>
                
                <TextInput
                   // placeholder="Email"
                    style={styles.textInput}
                    onChangeText={text => setEmail(text)}
                    defaultValue={email}
                />
                
                {setUp &&
                    <Text style={styles.text}>
                    Phone Number
                </Text>
                }
                {setUp &&
                    <TextInput
                    // If user is a customer hide the phone number text input and phone text above
                    keyboardType="numeric"
                    //placeholder="Phone Number"
                    style={styles.textInput}
                    onChangeText={text => setNewPhone(text)}
                    defaultValue={users.phone}
                />}

                <View style={styles.view2}>

                    {/* If correct credentials go to the homepage via bottom navigation */}
                    <TouchableOpacity
                              onPress={() => updateUser()}
                        //onPress={() => updateEmail()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
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
        marginTop: 'auto',
        width: "90%",
        color: 'black',
        fontSize: 16
    },

    view2: {
        flex: 1,
        marginTop: 0,
        alignItems: "center",
        padding: 10,
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

    view2: {
        marginTop: 0,
        alignItems: "center",
        padding: 10,
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

});

export default EditAccount;