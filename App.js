import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from './src/Screens/SignIn'
import SignUp from './src/Screens/SignUp'
import OnBoardingScreen from './src/Screens/OnboardingScreen'
import BottomNavigation from './src/BottomNavigation'
import Account from './src/Screens/Account'
import SetUp from './src/Screens/SetUp'
//import { decode, encode } from 'base-64'
import * as firebase from 'firebase';
import apiKeys from './src/firebase/config';
import { Alert, Text, View } from 'react-native';
import { useState } from 'react';

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
                        isLoading: false,
                    };
                    case 'SIGN_UP':
                    return {
                        ...prevState,
                        isSignout: false,
                        newVendor: true,
                        userToken: action.token,
                        isLoading: false,
                    };
                
                    case 'SETUP':
                        return{
                            ...prevState,
                            newVendor: false,
                            isSignout: false,
                            isLoading: false,
                        };

                        
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case 'SKIP':
                    return{
                        isLoading: false,
                    }

            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            newVendor: false
           
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

                        .signInWithEmailAndPassword(data.email, data.password)
                        .then(data => {
                            let user = firebase.auth().currentUser.providerData;
                            console.log('this is data',user)
                            setUserId(user);
                        }).catch(error => {
                            console.log(error);
                        });



                } catch (err) {
                    Alert.alert("There is something wrong!", err.message);
                }
                

               console.log("I am Here Look Here " + userId)

                dispatch({ type: 'SIGN_IN', token: userId });
            },
            setUp: (data) => {
                firebase
                    .database()
                    .ref("vender/" + userId)
                    .update({
                        FoodTruckName: data.FoodTruckName, 
                        FoodTruckLocation: data.FoodTruckLocation,
                        FoodType: data.FoodType,
                        LicensePlate: data.LicensePlate

                    });
                dispatch({ type: 'SET_UP'})},
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            skip:() => dispatch({ type: 'SKIP' }),
           
            signUp: async data => {
                let userToken;
                let reference;
                console.log(userToken)
                try {

                    await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                    .then(data => {
                        userToken = data.user.uid
                        setUserId(userToken)
                    }).catch(error => {
                        console.log(error);
                    });
                    

                } catch (err) {
                    Alert.alert("There is something wrong!!!!", err.message);
                }
                try{
                    if(data.isVender == true){
                        reference = 'vender/'
                    }
                    else{
                        reference = 'users/'
                    }
                    await firebase
                    .database()
                    .ref(reference + userToken)
                    .set({
                        userId: userToken,
                        Fullname: data.fullName,
                        phone: data.phone,
                        
                        
                       // FoodType: data.FoodType
                       // FoodTruckLocation: data.FoodTruckLocation

                    });
                }catch (err) {
                    Alert.alert("There is something wrong!!!!", err.message);
                }

                
                

                dispatch({ type: 'SIGN_UP', token: userToken });
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
                    { state.userToken == null ? (
                        state.isLoading ? 
                        (
                        
                        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
                        
                         
                        ):(
                            <>
                            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                            </>
                    )

                         
                        ):(
                            state.newVendor==true ? (
                        
                        
                                <Stack.Screen name="SetUp" component={SetUp} options={{ headerShown: false }} /> 
                        
                        
                        ):(
                           <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
                    )
                            )
                            }
                    
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
