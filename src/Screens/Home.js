/**
 * Home Screen
 *
 * First Screen the user will see when they sign in
 * Navigation to user account 
 * Will display:
 *
 */



import * as React from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Component } from 'react';
import {AuthContext} from '../../App'
//import { auth } from "../firebase";



const Home = ({ navigation }) => {

    const {signOut} = React.useContext(AuthContext);

    const logout = () => {
        signOut();
    }
    const getinfo = () => {
        var ref = db.ref("dinosaurs");
ref.orderByChild("dimensions/height").on("child_added", function(snapshot) {
  console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
});
    }

    return (
      <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>
        <View style={styles.MainView} >
            <View style={styles.Top} >

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', }}>
                <Text style={{ color: '#FFF' }}> Home </Text>

                </View>
                {/* Click profile image to navigate to account screen*/}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Account')} style={styles.button}>
                <Image
                    style={styles.profilePic }
                    source={require('../../assets/default.png') }
                        resizeMode={'cover'} />
                </TouchableOpacity>
            </View>
            </View>

            {<Button onPress={logout} title="Sign Out" />}
      </LinearGradient>
        );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#2193b0',
    },

    MainView: {
        flex:1,
        alignContent: 'center',
    },

    Top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '8%',
        //backgroundColor: '#000',
        color: '#fff',
        borderColor: '#FC5976',
        borderBottomWidth: 1,
       // borderTopWidth: 1,
    },

    profilePic: {
        height: 38,
        width: 38,
        margin: 12,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 0.5,
        borderColor: '#FC5976'
    }
});



export default Home;
