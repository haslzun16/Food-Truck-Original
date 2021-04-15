/**
 * Account Screen
 *
 * Shows the user's information
 * Allows CRUD operations
 * Settings Page
 *
 */

import * as React from "react";
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


class Account extends Component {

  render() {

    return (
      <View style={styles.MainView}>
        <View>
          <Text> Acoount </Text>

        </View>
        <View style={styles.view2}>
          {/* If correct credentials go to the homepage via bottom navigation */}
          <TouchableOpacity
            onPress={() => signout()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignContent: "center",

  },
  view2: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: "50%",
  },
});

export default Account;
