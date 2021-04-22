/**
 * Onboarding Screen
 *
 * First Screen in the application
 * Displays three screens that give an overview of the app
 *
 */

import * as React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { AuthContext } from "../../App";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

//Done button
const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 8 }} {...props}>
    <Text style={{ fontSize: 16 }}> Done </Text>
  </TouchableOpacity>
);

function OnboardingScreen({ navigation }) {
  const { skip } = React.useContext(AuthContext);

  return (
    <Onboarding
      DoneButtonComponent={Done}
      onSkip={() => skip()} //If Skip button clicked go to sign in page and replace
      onDone={() => skip()} //If Done button clicked go to sign in page and replace
      pages={[
        //First Page
        {
          backgroundColor: "#F5AF19",
          image: (
            <Image
              style={{
                width: 350,
                height: 230,
                alignItems: "center",
                marginTop: 10,
              }}
              source={require("../../assets/burger-2.png")}
            />
          ),
          title: "Discover",
          subtitle: "Amazing varieties of food trucks and food!",
        },
        //Second Page
        {
          backgroundColor: "#FC5976",
          image: (
            <Image
              style={{
                width: 300,
                height: 190,
                alignItems: "center",
                marginTop: 10,
              }}
              source={require("../../assets/new-megaP.png")}
            />
          ),
          title: "Up-To-Date",
          subtitle: "Stay informed about food truck announcments in your area! ",
        },
        //Third Page
        {
          backgroundColor: "#F5AF19",
          image: (
            <Image
              style={{
                width: 350,
                height: 230,
                alignItems: "center",
                marginTop: 10,
              }}
              source={require("../../assets/mmap.png")}
            />
          ),
          title: "Explore",
          subtitle: "Search for food trucks near you!",
        },
      ]}
      transitionAnimationDuration={0}
    />
  );
}
export default OnboardingScreen;
