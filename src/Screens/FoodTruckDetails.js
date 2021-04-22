import React from "react";
import { useState, useEffect } from "react";
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import * as firebase from "firebase";
import _ from "lodash";
import openMap from 'react-native-open-maps';
import { MaterialCommunityIcons } from "@expo/vector-icons";


const MyPage = ({ navigation, route }) => {

    const [menus, setMenus] = useState([]);
    const [location, setLocation] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMenus();
        getlocation();
    }, []);

    const getMenus = () => {

        let menuRef = firebase.database().ref("vender/" + route.params.item.userId + "/menu");

        menuRef.on("value", (snapshot) => {
            let val = snapshot.val();
            let valToArray = _.map(val, (element) => {
                return { ...element };
            });

            setMenus(valToArray);

        });
    };
    const getlocation = () => {

        let menuRef = firebase.database().ref("vender/" + route.params.item.userId + "/location");

        menuRef.on("value", (snapshot) => {
            let val = snapshot.val();
            
            
            setLocation(val);

        });
       
    };

    

    const goToTruck = () => {
        openMap({ latitude: location.latitude, longitude: location.longitude, end: location.latitude + ", " + location.longitude });
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View>
                    <TouchableOpacity
                        disabled={true}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                backgroundColor: "#F5F5F5",
                                marginTop: 10,
                                borderRadius: 20,
                            }}
                        >
                            {/* Food Image */}
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    margin: 5,
                                    borderRadius: 5,
                                }}
                            ></Image>
                            

                            <View
                                style={{ flex: 1, flexDirection: "column", height: 100 }}
                            >
                                {/* Food Name */}
                                <Text style={styles.flatListItem2}>{item.name}</Text>

                                <View style={{ flexDirection: "row" }}></View>

                                {/* Food Price */}
                                <Text style={styles.flatListItem3}>{item.price}</Text>

                                {/* Food Description */}
                                <Text style={styles.flatListItem3}>{item.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Line that separates Food */}

                    <View style={{ height: 1, backgroundColor: "#F5AF19" }} />
                </View>

            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.Top}>
                <ImageBackground
                    //source={uri: route.params.item.foodTruckImage}
                    source={{ uri: route.params.item.foodTruckImage ? route.params.item.foodTruckImage : null }}

                    //	resizeMode="contain"
                    style={styles.TopImage}
                />
            </View>
         <View style={styles.Mid}>
                {/*  <Text style={styles.FoodTruckName}> Amoroso's Bakery </Text>  */}
                <Text style={styles.FoodTruckName}> {route.params.item.FoodTruckName} </Text>  

                <Text style={styles.Location}>
                    {route.params.item.FoodTruckLocation}
                </Text>
                <TouchableOpacity
                        style={{
                            backgroundColor: "#F5AF19",
                            borderRadius: 200,
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            margin: 0,
                        }}
                        onPress={goToTruck}
                    >
                        <MaterialCommunityIcons
                            name="account-edit"
                            style={{
                                alignSelf: "center",
                                marginTop: 30,
                                width: "50%",
                                height: "50%",
                            }}
                            size={26}
                            Account
                        ></MaterialCommunityIcons>
                        <Text
                            style={{
                                position: "relative",
                                marginTop: 12,
                                color: "black",
                                fontSize: 9,
                            }}
                        >
                            Locate
                        </Text>
                    </TouchableOpacity>
                   
            </View>
            
            <View style={{ height: 1, backgroundColor: "#F5AF19" }} />

            <View style={styles.Bottom}>
                <FlatList
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    data={menus}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Top: {
        height: "30%",
        width: "100%",
        backgroundColor: "black",
    },
    TopImage: {
        height: "100%",
        width: "100%",
    },
    Mid: {
        height: "20%",
        width: "100%",
       // backgroundColor: 'red'
    },

    FoodTruckName: {
        fontSize: 30,
        alignSelf: "center",
    },
    Location: {
        fontSize: 20,
        alignSelf: "center",
    },
    Bottom: {
        height: "50%",
        width: "100%",
    },

    flatListItem2: {
        color: "black",
        paddingLeft: 0,
        fontSize: 20,
    },
    flatListItem3: {
        color: "black",
        paddingRight: 20,
        marginTop: 5,
        fontSize: 14,
        justifyContent: "flex-end",
        flexDirection: "row",
        marginTop: "auto",
    },
    flatListItem: {
        color: "black",
        marginTop: "auto",
        fontSize: 16,
        textAlign: "center",
        marginRight: "auto",
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: 300,
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        padding: 10,
        margin: 5,
    },
    buttonSection: {
        height: 150,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    view2: {
        marginTop: 0,
        alignItems: "center",
        padding: 10,
    },

    button: {
        width: 100,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#FEAD44",
    },

    buttonLocation: {
        width: 100,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        color: 'yellow',
    },

    buttonText: {
        fontSize: 18,
        textAlign: "center",
        margin: 5,
        color: "#FFFFFF",
    },
});
export default MyPage;