/**
 * Sign In Screen
 *
 * Second Screen user will see
 * Allows the user to sign in or navigate to sign up screen
 *
 */

import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import { auth } from "../firebase";
import { LogBox } from "react-native";
import { useEffect, useState } from "react";
LogBox.ignoreLogs(["Setting a timer"]);
import "firebase/firestore";
import { Alert } from "react-native";
import { AuthContext } from "../../App";
import * as firebase from "firebase";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);


  const { signIn } = React.useContext(AuthContext);

  const onFooterLinkPress = () => {
    navigation.navigate("SignUp");
  };

  const onLoginPress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    } else {
      signIn({ email, password });
    }
  };


    const forgotPassword = () => {
        setModalVisible(false);

        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                alert('Please check your email.')
            }).catch(function (e) {
                console.log(e)
            })
    }


  return (
    <LinearGradient colors={["#F5AF19", "#FC5976"]} style={styles.body}>

          <Modal visible={modalVisible}>
              <View style={styles.modal}>

                  <Text style={{ fontSize: 30 }}> Forgot Your Password? </Text>

                  <Image
                      style={{
                          width: 180,
                          height: 187,
                          alignItems: "center",
                          marginTop: 10,
                      }}
                      source={require("../../assets/lock.png")}
                      resizeMode={"cover"}
                  />

                  <Text style={{ marginTop: 20, fontSize: 15, textAlign: 'center' }}> Enter your email address to be sent a link to reset your password. </Text>

                  <TextInput
                      style={styles.textInput2}
                      placeholder="Enter Email Address"
                      onChangeText={(text) => setEmail(text)}
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
                              onPress={() => forgotPassword()}
                              style={styles.buttonModal}
                          >
                              <Text style={styles.buttonTextModal}>Confirm</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>

      <View>
        <View style={styles.top}>
          <View style={styles.view}>
            <Text style={styles.Text}> Fogul Moves </Text>
            <Image
              style={{
                width: 280,
                height: 147,
                alignItems: "center",
                marginTop: 10,
              }}
              source={require("../../assets/orange-food-truck.png")}
              resizeMode={"cover"}
            />
          </View>
        </View>

        <View style={styles.middle}>
          <View style={styles.tiButtons}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
           //   value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <TouchableOpacity
                style={{    paddingLeft: 5,
                textAlign: "left",
                alignSelf: "stretch",}}
                onPress={() => setModalVisible(true) }
                      >
            <Text style={styles.forgotPass}>Forgot Password?</Text>
            
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.bottomV}>
          <View style={styles.view2}>
            {/* If correct credentials go to the homepage via bottom navigation */}
            <TouchableOpacity
              onPress={() => onLoginPress()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* When clicked go to the sign up screen and replace */}
          <View style={styles.bottomText}>
            <Text style={styles.bottomText3}>Don't have an account?</Text>
            <Text style={styles.bottomText2} onPress={onFooterLinkPress}>
              {" "}
              Sign Up{" "}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

//Added too many styles that are not in use. Will fix later
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#2193b0",
  },
  top: {
    height: "38%",
  },
  middle: {
    // backgroundColor: "#000",
    height: "32%",
  },
  bottomV: {
    height: "30%",
    // backgroundColor: '#fff',
  },
  view: {
    marginTop: "auto",
    alignItems: "center",
    padding: 10,
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

  tiButtons: {
    marginTop: 50,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 20,
    margin: 10,
    width: "90%",
  },
  Text: {
    fontSize: 36,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },

  forgotPass: {
    paddingLeft: 30,
    textAlign: "left",
    alignSelf: "stretch",

    color: "#fff",
  },

  buttonText: {
    position: "absolute",
    paddingLeft: 60,
    fontSize: 18,
    textAlign: "center",
    margin: 15,
    color: "#FFFFFF",
  },
  bottomText: {
    flex: 1,
    justifyContent: "flex-end",
    fontSize: 14,
    flexDirection: "row",
    paddingLeft: 20,
    //paddingBottom: 60,
    marginTop: "auto",
    color: "#fff",
  },
  bottomText2: {
    flex: 1,
    justifyContent: "flex-end",
    fontSize: 14,
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 20,
    marginTop: "auto",
    color: "#FEAD44",
  },
  bottomText3: {
    flex: 1,
    justifyContent: "flex-end",
    fontSize: 14,
    flexDirection: "row",
    paddingLeft: 0,
    paddingBottom: 20,
    marginTop: "auto",
    color: "#fff",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
