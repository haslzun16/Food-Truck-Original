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
import {
    NavigationContainer, DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import OnBoardingScreen from "./src/Screens/OnboardingScreen";
import Account from "./src/Screens/Account";
import EditAccount from "./src/Screens/EditAccount";
import FoodTruckDetails from "./src/Screens/FoodTruckDetails";
import AnnouncementDetails from "./src/Screens/AnnouncementDetails";
import Loading from "./src/Screens/Loading";
import BottomNavigation from "./src/BottomNavigation";
import SetUp from "./src/Screens/SetUp";

import { useState } from "react";

//import { decode, encode } from 'base-64'
import * as firebase from "firebase";
import apiKeys from "./src/firebase/config";
import { Alert, Text, View } from "react-native";

import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';


export const AuthContext = React.createContext();

function SplashScreen() {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

const Stack = createStackNavigator();

export default function App() {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333',
            border: '#F5F5F5',
            line: '#000'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            //background: '#333333',
            background: '#000',
            text: '#ffffff',
            line: '#fff'
        }
    }

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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
                        isDelete: false,
                    };
                case "SIGN_UP":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        isLoading: false,
                        newVender: true,
                        isDelete: false,
                    };
                case "SET_UP":
                    return {
                        ...prevState,
                        newVender: false,
                        isSignout: false,
                        isLoading: false,
                        isDelete: false,
                    };

                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        isDelete: false,
                    };

                case "DELETE_ACCOUNT":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: null,
                        isDelete: true,
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
            isDelete: false,
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
            let user = "";
            let access = false;
            await firebase
                .auth()

                .signInWithEmailAndPassword(data.email.trim(), data.password.trim())
                .then((data) => {
                    user = data.user.uid
                    access = true;

                })
                .catch((error) => {
                    Alert.alert("Wrong email or password!", error.message);
                    access = false;

                });

            if (access == false) {

                return
            }
            setUserId(user);


            dispatch({ type: "SIGN_IN", token: user });
        },
        setUp: (data) => {

            firebase
                .database()
                .ref("vender/" + userId)
                .update({
                    FoodTruckName: data.FoodTruckName,
                    FoodTruckLocation: data.FoodTruckLocation,
                    FoodType: data.FoodType,
                    LicensePlate: data.LicensePlate,
                    hours: data.hours
                });


            dispatch({ type: "SET_UP" })
        },

        deleteAccount:  () => {

            var user = firebase.auth().currentUser;

            user.delete().then(function () {
                // User deleted.
            }).catch(function (error) {
                // An error happened.
            });

            dispatch({ type: "DELETE_ACCOUNT", })

        },


        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
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
                        console.log('this is usertoken', userToken)
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
                            foodTruckImage: "https://firebasestorage.googleapis.com/v0/b/foodtruck-a92cc.appspot.com/o/Default%20Food%20Truck%20Image%2Ffood-truck-default-image.jpg?alt=media&token=9de3da8e-07d4-445e-ac92-96f0dc476d4f",
                            profileImage: "https://firebasestorage.googleapis.com/v0/b/foodtruck-a92cc.appspot.com/o/Default%20Image%20Profile%2Fdefault.png?alt=media&token=518e4aab-614e-4e5b-870e-f4469cb51973",
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
                            user: true,
                            profileImage: "https://firebasestorage.googleapis.com/v0/b/foodtruck-a92cc.appspot.com/o/Default%20Image%20Profile%2Fdefault.png?alt=media&token=518e4aab-614e-4e5b-870e-f4469cb51973",
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
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
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
          ) : (
            <>
            <Stack.Screen
                  name="Loading"
                  component={Loading}
                  options={{ headerShown: false }}
                />
               <Stack.Screen
                 name="SetUp"
                 component={SetUp}
                 options={{ headerShown: false }}
               />
               <Stack.Screen
                 name="BottomNavigation"
                 component={BottomNavigation}
                 options={{headerShown: false }}
              />
             <Stack.Screen
                 name="Account"
                 component={Account}
                 options={{ headerShown: false }}
             />
             <Stack.Screen
                name="EditAccount"
                component={EditAccount}
                options={{ headerShown: false }}
             />
            </>
          )}
             <Stack.Screen
                 name="FoodTruckDetails"
                 component={FoodTruckDetails}
                 options={{ headerShown: false }}
             />
             <Stack.Screen
                 name="AnnouncementDetails"
                 component={AnnouncementDetails}
                 options={{ headerShown: false }}
             />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    );
}