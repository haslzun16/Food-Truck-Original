import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';

//import { decode, encode } from 'base-64'

import { Alert, Text, View } from 'react-native';

export default function SetUp() {
const [FoodTruckName, setFoodTruckName] = useState("");
const [FoodTruckLocation, setFoodTruckLocation] = useState("");
const [FoodType, setFoodType] = useState("");
const [LicensePlate , LicensePlate] = useState('');

// on register press change !!!
const onRegisterPress = () => {
    if (password !== confirmpassword) {
        alert("Passwords don't match.")
        return
    }

    Setup({ FoodTruckLocation,FoodTruckName,FoodType,LicensePlate});

}



  return (
   <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>
                <View style={styles.top}>
                    <View style={styles.view}>
                        {/* <Image
                            style={{ width: 230, height: 120, alignItems: 'center', marginTop: 20 }}
                            source={require('../assets/orange-food-truck.png')} 
                            resizeMode ={'cover'}/>
                            */}

                        <Text style={styles.Text}> Set Up Your Account </Text>
                    </View>
                </View>

                <View style={styles.middle}>
                    <View style={styles.tiButtons} >
                        <TextInput style={styles.textInput} placeholder="Enter your food trucks name" value={FoodTruckName} 
                        onChangeText={(text) => setFoodTruckName(text)} />
                        <TextInput style={styles.textInput} placeholder="Enter your food trucks location" value={FoodTruckLocation} 
                        onChangeText={(text) => setFoodTruckLocation(text)} />
                        <TextInput style={styles.textInput} placeholder="Enter your food type" value={FoodType} 
                        onChangeText={(text) => setFoodType(text)} />
                         <TextInput style={styles.textInput} placeholder="Enter your Food Truck License plate" value={LicensePlate} 
                        onChangeText={(text) => setLicensePlate(text)} />
                               
                    </View>
                </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
   body: {
        flex: 1,
        backgroundColor: '#2193b0',
    },
    view: {
        alignItems: 'center',
        paddingTop: 20,
        
    },
    top: {
        height: '15%',
      //  backgroundColor: '#fff'
    },
    middle: {
     //   backgroundColor: "#000",
        height: '55%',
    },
    tiButtons: {
        marginTop: 0,
        alignItems: 'center',
      //  flexDirection: "row"
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 30,
        padding: 8,
        paddingHorizontal: 20,
        marginTop: 30,
        width: '85%'
    },
     Text: {
        fontSize: 36,
        textAlign: 'center',
        color: '#fff',
        marginTop: 0,
    },
});