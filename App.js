/* You will need to install the following to make the app work:
npm add @react-navigation/native && npm add @react-navigation/stack && 
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/native
npm install @react-navigation/stack 
npm install react-native-onboarding-swiper
npm install react-native-switch-selector  
npm install @react-navigation/bottom-tabs
expo install firebase
npm install expo-image-picker
npm install expo-constants
npm install react-native-floating-action
*/

import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import OnBoardingScreen from "./src/Screens/OnboardingScreen";
import BottomNavigation from "./src/BottomNavigation";
import Account from "./src/Screens/Account";
import FoodTruckDetails from "./src/Screens/FoodTruckDetails";
import EditMyPage from "./src/Screens/EditMyPage";
import { useState } from "react";

//import { decode, encode } from 'base-64'
import * as firebase from "firebase";
import apiKeys from "./src/firebase/config";
import { Alert, Text, View } from "react-native";

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = useState("");

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
            newVender: true,
          };
        case "SET_UP":
          return {
            newVender: false,
          };

        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case "SKIP":
          return {
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      newVender: true,
    }
  );

  // React.useEffect(() => {
  //     // Fetch the token from storage then navigate to our appropriate place
  //     const bootstrapAsync = async () => {
  //         let userToken;

  //         try {
  //             userToken = await firebase.auth().currentUser.getIdTokenResult();
  //         } catch (err) {
  //             Alert.alert("Restoring token failed");
  //         }

  //         // After restoring token, we may need to validate it in production apps

  //         // This will switch to the App screen or Auth screen and this loading
  //         // screen will be unmounted and thrown away.
  //         dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //     };
  //     bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (data) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `AsyncStorage`
      let user ="";
      try {
        await firebase
          .auth()

          .signInWithEmailAndPassword(data.email.trim(), data.password.trim())
          .then((data) => {
            user = data.user.uid
            
            
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        Alert.alert("There is something wrong!", err.message);
      }
      setUserId(user);

      dispatch({ type: "SIGN_IN", token: user });
    },
    setup: (data) => {

      firebase
          .database()
          .ref("venders/" + userId)
          .set({
            
            
            
          });


      dispatch({ type: "SET_UP" })
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    skip: () => dispatch({ type: "SKIP" }),
    signUp: async (data) => {
      let userToken = "";
      let reference;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            data.email.trim(),
            data.password.trim()
          )
          .then((data) => {
            userToken = data.user.uid
            console.log('this is usertoken',userToken)
            setUserId(userToken)
            
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        Alert.alert("There is something wrong!!!!", err.message);
      }
      try {
        //for venders only
        if (data.isVender == true) {
          reference = "vender/";

          await firebase
          .database()
          .ref(reference + userToken)
          .set({
            userId: userToken,
            Fullname: data.fullName,
            phone: data.phone,
            isSetUp: false,
          });
          //for users 
        } else {
          reference = "users/";

          await firebase
          .database()
          .ref(reference + userToken)
          .set({
            userId: userToken,
            Fullname: data.fullName,
            phone: data.phone,
            isSetUp: true,
          });
        }
       
      } catch (err) {
        Alert.alert("There is something wrong!!!!", err.message);
      }
      setUserId(userToken);

      dispatch({ type: "SIGN_UP", token: userToken });
    },
    getUserId: () => {
      return userId;
    },
  }));

  /*firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
})*/

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            state.isLoading ? (
              <Stack.Screen
                name="OnBoardingScreen"
                component={OnBoardingScreen}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
              </>
            )
          ) : state.newVender == false ? (
            <Stack.Screen
              name="SetUp"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
          )}

          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FoodTruckDetails"
            component={FoodTruckDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditMyPage"
            component={EditMyPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
