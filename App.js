import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from './src/Screens/SignIn'
import SignUp from './src/Screens/SignUp'
import OnBoardingScreen from './src/Screens/OnboardingScreen'
import BottomNavigation from './src/BottomNavigation'
import Account from './src/Screens/Account'
//import { decode, encode } from 'base-64'
import * as firebase from 'firebase';
import apiKeys from './src/firebase/config';
import { Alert, Text, View } from 'react-native';


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
    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(apiKeys.firebaseConfig);
    }

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };

            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await firebase.auth().currentUser.getIdTokenResult();
            } catch (err) {
                Alert.alert("Restoring token failed");
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                let userToken;
                
                try {
                    await firebase
                        .auth()

                        .signInWithEmailAndPassword(data.email.trim(), data.password.trim())
                        .then(data => {
                            userToken = data.user.uid
                        }).catch(error => {
                            console.log(error);
                        });



                } catch (err) {
                    Alert.alert("There is something wrong!", err.message);
                }
                

               console.log("I am Here Look Here " + userToken)

                dispatch({ type: 'SIGN_IN', token: userToken });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                let userToken;
                try {

                    await firebase.auth().createUserWithEmailAndPassword(data.email.trim(), data.password.trim())
                    .then(data => {
                        userToken = data.user.uid
                    }).catch(error => {
                        console.log(error);
                    });
                    

                } catch (err) {
                    Alert.alert("There is something wrong!!!!", err.message);
                }
                try{
                    await firebase
                    .database()
                    .ref('users/' + userToken)
                    .set({
                        userId: userToken,
                        Fullname: data.fullName,
                        phone: data.phone
                    });
                }catch (err) {
                    Alert.alert("There is something wrong!!!!", err.message);
                }
                

                dispatch({ type: 'SIGN_IN', token: userToken });
            }
            
        })
    
    );


//firebase.auth().onAuthStateChanged((user) => {
           //console.log(user);
//})

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
                    ) : state.userToken == null ? (
                        <>
                                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        </>
                        ) : (
                                <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
                            )}
                    <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}