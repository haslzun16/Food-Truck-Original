/**
 * Sign Up Screen
 *
 * Allows the user to sign up for a new account
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { AuthContext } from "../../App";

const SignUpoptions = [
  { label: "Customer", value: "customer" },
  { label: "Vendor", value: "vendor" },
];

export default function SignUp({ navigation }) {
  const [phone, setPhone] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isVender, notVendor] = useState(false);

  const { signUp } = React.useContext(AuthContext);

  const onFooterLinkPress = () => {
    navigation.navigate("SignIn");
  };

  const onRegisterPress = () => {
    if (password !== confirmpassword) {
      alert("Passwords don't match.");
      return;
    }

    signUp({ fullName, email, password, phone, isVender });
  };

  return (
    <LinearGradient colors={["#F5AF19", "#FC5976"]} style={styles.body}>
      <View>
        <View style={styles.top}>
          <View style={styles.view}>
            {/* <Image
                            style={{ width: 230, height: 120, alignItems: 'center', marginTop: 20 }}
                            source={require('../assets/orange-food-truck.png')} 
                            resizeMode ={'cover'}/>
                            */}

            <Text style={styles.Text}> Create Account </Text>
          </View>
        </View>

        <View style={styles.middle}>
          <View style={styles.tiButtons2}>
            {/* Toggle Switch: When clicked show or hide phone number input */}
            <SwitchSelector
              options={SignUpoptions}
              initial={0}
              onPress={() => notVendor(!isVender)}
              buttonColor="#FEAD44"
            />
          </View>

          <View style={styles.tiButtons}>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />

            {/* <TextInput
                            style={styles.textInput}
                            placeholder='Last Name'
                        /> 
                    </View> */}

            {/*  <View style={styles.uInput}> */}

            <TextInput
              style={styles.textInput2}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            {isVender ? (
              <TextInput
                style={styles.textInput2}
                placeholder="Phone Number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            ) : null}
            {/* </View>

                        <View style={styles.uInput2}> */}

            <TextInput
              secureTextEntry={true}
              style={styles.textInput2}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              secureTextEntry={true}
              style={styles.textInput2}
              placeholder="Cofirm Password"
              value={confirmpassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>

        <View style={styles.bottomV}>
          <View style={styles.signUp}>
            {/* If input is correct when button is clicked go to Sign In Screen */}
            <TouchableOpacity
              onPress={() => onRegisterPress()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {/* When clicked go back to the sign in page */}
          <View style={styles.bottomText}>
            <Text style={styles.bottomText3}>Already have an account?</Text>
            <Text style={styles.bottomText2} onPress={onFooterLinkPress}>
              {" "}
              Sign In{" "}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#2193b0",
  },
  view: {
    alignItems: "center",
    paddingTop: 20,
  },
  top: {
    height: "15%",
    //  backgroundColor: '#fff'
  },
  middle: {
    //   backgroundColor: "#000",
    height: "55%",
  },
  bottomV: {
    height: "30%",
    //  backgroundColor: '#000',
  },
  button: {
    width: 200,
    height: 60,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: "#FEAD44",
  },
  tiButtons: {
    marginTop: 0,
    alignItems: "center",
    //  flexDirection: "row"
  },
  uInput: {
    marginTop: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  uInput2: {
    marginTop: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  tiButtons2: {
    //  flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    width: "95%",
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 40,
    width: "85%",
  },
  textInput2: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "85%",
  },
  Text: {
    fontSize: 36,
    textAlign: "center",
    color: "#fff",
    marginTop: 0,
  },
  buttonText: {
    position: "absolute",
    paddingLeft: 50,
    fontSize: 18,
    textAlign: "center",
    margin: 15,
    color: "#FFFFFF",
  },
  signUp: {
    alignItems: "center",
    paddingTop: 20,
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
    paddingLeft: 20,
    paddingBottom: 20,
    marginTop: "auto",
    color: "#fff",
  },
});
