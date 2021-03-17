/**
 * Sign In Screen
 *
 * Second Screen user will see
 * Allows the user to sign in or navigate to sign up screen
 *
 */


import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import { auth } from "../firebase";
import { LogBox } from 'react-native';
import { useEffect, useState } from 'react'
LogBox.ignoreLogs(['Setting a timer']);
import "firebase/firestore";
import { Alert } from "react-native";
import { AuthContext } from '../../App'


export default function SignIn({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = React.useContext(AuthContext);

    const onFooterLinkPress = () => {
        navigation.navigate('SignUp')
    }

    const onLoginPress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        }

        if (!password) {
            Alert.alert('Password field is required.');
        } else {
            signIn({ email, password });
        }

    };









    return (
        <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>
            <View>

                <View style={styles.top}>
                    <View style={styles.view} >
                    <Text style={styles.Text}> Food Truck Finder </Text>
                    <Image
                    style={{ width: 280, height: 146, alignItems: 'center', marginTop: 10 }}
                    source={require('../../assets/orange-food-truck.png')}
                    resizeMode={'cover'} />
                    </View>
                </View>

            <View style={styles.middle}>
                    <View style={styles.tiButtons} >

                        <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />

                        <TextInput secureTextEntry={true}
                    style={styles.textInput} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />

 
                    
                    <Text
                    style={styles.forgotPass}>
                    Forgot Password?
                    </Text>   
                </View>
            </View>

            <View style={styles.bottomV}>
                    <View style={styles.view2} >
                        {/* If correct credentials go to the homepage via bottom navigation */}
                        <TouchableOpacity
                            onPress={() => onLoginPress()} style={styles.button}>
                        <Text style={styles.buttonText}
                        >
                        Sign In
                    </Text>
                    </TouchableOpacity>
                </View>
                    {/* When clicked go to the sign up screen and replace */}
                <View style={styles.bottomText}>
                    <Text style={styles.bottomText3}>Don't have an account?</Text>
                        <Text style={styles.bottomText2}
                            onPress={onFooterLinkPress}
                    > Sign Up </Text>
                </View>
            </View>
            </View>
            </LinearGradient>
            
    );
};

//Added too many styles that are not in use. Will fix later
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2193b0',
    },
    top: {
        height:'38%',
    },
    middle: {
       // backgroundColor: "#000",
        height: '32%',
    },
    bottomV: {
        height: '30%',
       // backgroundColor: '#fff',

    },
    view: {
        marginTop: 'auto',
        alignItems: 'center',
        padding: 10,
    },
    view2: {
        marginTop: 0,
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: 200,
        height: 60,
        marginTop: 30,
        borderRadius: 30,
        backgroundColor: '#FEAD44',
    },

    tiButtons: {
        marginTop: 50,
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 30,
        padding: 8,
        paddingHorizontal: 20,
        margin: 10,
        width: '90%'
    },
    Text: {
        fontSize: 36,
        textAlign: 'center',
        color: '#fff',
        marginTop: 20,
    },

    forgotPass: {
        paddingLeft: 30,
        textAlign: 'left',
        alignSelf: 'stretch',
        
        color: '#fff',
    },

    buttonText: {
        position: 'absolute',
        paddingLeft: 60,
        fontSize: 18,
        textAlign: 'center',
        margin: 15,
        color: '#FFFFFF',
    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        fontSize: 14,
        flexDirection: 'row',
        paddingLeft: 20,
        //paddingBottom: 60,
        marginTop: 'auto',
        color: '#fff',
    },
    bottomText2: {
        flex: 1,
        justifyContent: 'flex-end',
        fontSize: 14,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 20,
        marginTop: 'auto',
        color: '#FEAD44'
    },
    bottomText3: {
        flex: 1,
        justifyContent: 'flex-end',
        fontSize: 14,
        flexDirection: 'row',
        paddingLeft: 0,
        paddingBottom: 20,
        marginTop: 'auto',
        color: '#fff',
    }
});

