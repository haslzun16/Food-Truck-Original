/**
 * Anthony Barrera
 *
 * Last edited 4/20/21
 * 
 * shows the input fields that new users have to enter
 *
 * npm install react-native-dropdown-picker --save
 */

//imports
import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ListViewComponent, Modal, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { AuthContext } from '../../App'
import * as firebase from "firebase";
import DropDownPicker from 'react-native-dropdown-picker';
//import { decode, encode } from 'base-64'
import * as ImagePicker from "expo-image-picker";



export default function SetUp({ navigation }) {
    const [FoodTruckName, setFoodTruckName] = useState("");
    const [FoodTruckLocation, setFoodTruckLocation] = useState("");
    const [FoodType, setFoodType] = useState("");
    const [LicensePlate, setLicensePlate] = useState('');
    const [hours, setHours] = useState('');
    const [tempImage, setTempImage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const { setUp } = React.useContext(AuthContext);
    const { getUserId } = React.useContext(AuthContext);

    let userId = getUserId();








    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setTempImage(result.uri);
        }
    };


    const insertFoodTruckImage = (url) => {
        setModalVisible(false);

        let foodTruckImageRef = firebase.database().ref("vender/" + userId);
        let createdFoodTruckImage = foodTruckImageRef
        let foodTruckImage = {
            foodTruckImage: url,
        };
        createdFoodTruckImage
            .update(foodTruckImage)
            .then((res) => {
                setTempImage("");
                alert('Food Truck Image Added!')
            })
            .catch((err) => console.log(err));

    };

    // T0-Do you need to add a loading screen because the uploading image kinda takes time to upload
    //method to upload image to database then it downloads the image and sends the url to insertmenu method
    const uploadImageToStorage = async () => {
        let response = await fetch(tempImage);
        let blob = await response.blob();

        firebase
            .storage()
            .ref()
            .child(userId + "/FoodTruckImage/" + FoodTruckName)
            .put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then(url => {
                        console.log(' * new url', url)
                        insertFoodTruckImage(url);
                    })
            });
    };







    // on register press change !!!
    const onSetUpPress = () => {

        let userId = getUserId();
        firebase.database().ref("vender/" + userId).update({ isSetUp: true });
        setUp({ FoodTruckName, FoodTruckLocation, FoodType, LicensePlate, hours });
        navigation.navigate("BottomNavigation");

    }
    return (
        <LinearGradient colors={['#F5AF19', '#FC5976']} style={styles.body}>

            <Modal visible={modalVisible}>
                <View style={styles.modal}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    <Image
                        source={{ uri: tempImage ? tempImage : "../../assets/NoImage.png" }}
                        style={{ width: 200, height: 200 }}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.view2}>
                            {/* Close and Cancel the Modal */}
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.buttonModal}
                            >
                                <Text style={styles.buttonTextModal}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view2}>
                            {/* Add Profile Image to the database */}
                            <TouchableOpacity
                                onPress={() => uploadImageToStorage()}
                                style={styles.buttonModal}
                            >
                                <Text style={styles.buttonTextModal}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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

                    <TouchableOpacity
                        style={styles.ImageButton}
                        onPress={() => setModalVisible(true)}>
                        <Text
                            style={{ textAlign: 'center', paddingTop: 15, }}>
                            Add Image </Text>
                    </TouchableOpacity>

                    <TextInput style={styles.textInput} placeholder="Enter your food trucks name" value={FoodTruckName}
                        onChangeText={(text) => setFoodTruckName(text)} />

                    <TextInput style={styles.textInput} placeholder="Enter your food trucks city" value={FoodTruckLocation}
                        onChangeText={(text) => setFoodTruckLocation(text)} />

                    {/* <TextInput style={styles.textInput} placeholder="Enter your food type" value={FoodType}
                        onChangeText={(text) => setFoodType(text)} /> */}

                    <TextInput style={styles.textInput} placeholder="Enter your Food Truck License plate" value={LicensePlate}
                        onChangeText={(text) => setLicensePlate(text)} />

                    <TextInput style={styles.textInput} placeholder="Enter your hours of operations" value={hours}
                        onChangeText={(text) => setHours(text)} />

                    <DropDownPicker
                        items={[
                            { label: 'Hispanic', value: 'hispanic' },
                            { label: 'Asian', value: 'asian' },
                            { label: 'Indian', value: 'indian' },
                            { label: 'American', value: 'American' },
                            { label: 'Soul', value: 'soul' },
                            { label: 'Seafood', value: 'seafood' },
                            { label: 'Vegan', value: 'vegan' },
                            { label: 'French', value: 'french' },
                            { label: 'Italian', value: 'italian' },
                            { label: 'Mediterranean', value: 'mediterranean' },
                            { label: 'Greek', value: 'Greek' },
                            { label: 'Breakfast', value: 'breakfast' },
                            { label: 'Sweets', value: 'sweets' },

                        ]}
                        defaultValue="Food"
                        placeholder="Select the type of food you sell"
                        containerStyle={{ height: 40, width: "85%", marginTop: 30 }}
                        style={{ backgroundColor: '#fafafa', }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={(items) => setFoodType(items.label)}
                    />


                    <TouchableOpacity
                        onPress={() => onSetUpPress()} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Finish Set Up
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>

        </LinearGradient>
    );
}

var width = Dimensions.get('window').width;

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
    button: {
        width: 200,
        height: 60,
        marginTop: 30,
        borderRadius: 30,
        backgroundColor: '#FEAD44',
    },
    buttonText: {
        position: 'absolute',
        paddingLeft: 50,
        fontSize: 18,
        textAlign: 'center',
        margin: 15,
        color: '#FFFFFF',
    },
    tiButtons: {
        marginTop: 0,
        alignItems: 'center',
        //  flexDirection: "row"
    },
    textInput: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderRadius: 30,
        padding: 8,
        paddingHorizontal: 20,
        marginTop: 13,
        width: "85%",
    },
    Text: {
        fontSize: 36,
        textAlign: 'center',
        color: '#fff',
        marginTop: 0,
    },

    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonModal: {
        width: 100,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#FEAD44",
    },

    buttonTextModal: {
        fontSize: 18,
        textAlign: "center",
        margin: 5,
        color: "#FFFFFF",
    },

    view2: {
        marginTop: 0,
        alignItems: "center",
        padding: 10,
    },

    profilePic: {
        height: "100%",
        width: "100%",
        backgroundColor: 'black',
        borderColor: "#F5F5F5",
    },

    Top: {
        height: "30%",
        width: "100%",
        backgroundColor: "black",
    },
    TopImage: {
        height: "90%",
        width: "80%",
    },

    ImageButton: {
        width: 200,
        height: 60,
        // marginTop: 30,
        borderRadius: 0,
        backgroundColor: 'white',
    }

});
