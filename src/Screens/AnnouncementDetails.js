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
import { MaterialCommunityIcons } from "@expo/vector-icons";


const AnnouncementDetails = ({ navigation, route }) => {

    const [menus, setMenus] = useState([]);

    const [info, setInfo] = useState([]);

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = () => {

        console.log("ROUTE ID: " + route.params.item.userid);

        let menuRef = firebase.database().ref("vender/" + route.params.item.userid + "/menu");


        menuRef.on("value", (snapshot) => {
            let val = snapshot.val();
            let valToArray = _.map(val, (element) => {
                return { ...element };
            });

            setMenus(valToArray);

        });
    };


    useEffect(() => {
        getFoodTruck();
    }, []);

    const getFoodTruck = () => {

        let foodTruckRef = firebase.database().ref("vender/" + route.params.item.userid);

        foodTruckRef.on('value', function (snapshot) {

            setInfo(snapshot.val());

           // console.log(info)

        });
    };

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View>
                    <TouchableOpacity
                        disabled={true}>
                        <View
                            style={{
                          /*      flex: 1,
                                flexDirection: "row",
                                backgroundColor: "#F5F5F5",
                                marginTop: 10,
                                borderRadius: 20,  */


                                flex: 1,
                                flexDirection: "row",
                                //   marginTop: 10,
                                borderRadius: 20,
                                //    marginBottom: 20,
                                padding: 5,
                                borderRadius: 12,
                                //        backgroundColor: 'red',
                                //    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                //   shadowOffset: {
                                //       width: 0,
                                //       height: 10
                                //   },
                                //   shadowColor: "#000",
                                //  shadowOpacity: 1,
                                //  shadowRadius: 20,
                                //  shadowOffset: { width: 0, height: 20 },
                                //   shadowColor: "black",
                                //   shadowOpacity: 1,
                                //  elevation: 3,
                                // background color must be set
                                //  backgroundColor: "#0000" // invisible color
                                backgroundColor: "white"

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
                    source={{ uri: info.foodTruckImage ? info.foodTruckImage : null }}

                    //	resizeMode="contain"
                    style={styles.TopImage}
                />
            </View>
            <View style={styles.Mid}>
                {/*  <Text style={styles.FoodTruckName}> Amoroso's Bakery </Text>  */}
                <Text style={styles.FoodTruckName}> {route.params.item.vendorname} </Text>

                <View
                    style={{
                        alignItems: "center",
                        //justifyContent: "center",
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        marginTop: '5%',
                    }}
                >

                    <Text style={styles.Location}>
                        <MaterialCommunityIcons
                            name="city-variant"
                            style={{
                                //   alignSelf: "center",
                                //   width: 50,
                                //   height: 50,
                            }}
                            size={20}
                            Account
                        ></MaterialCommunityIcons>
                        {info.FoodTruckLocation}
                    </Text>

                    <Text style={styles.Location}>
                        <MaterialCommunityIcons
                            name="clock-time-four"
                            style={{
                                //   alignSelf: "center",
                                //   width: 50,
                                //   height: 50,
                            }}
                            size={20}
                            Account
                        ></MaterialCommunityIcons>
                        {info.hours}
                    </Text>

                    <Text style={styles.Location}>
                        <MaterialCommunityIcons
                            name="silverware"
                            style={{
                                //   alignSelf: "center",
                                //   width: 50,
                                //   height: 50,
                            }}
                            size={20}
                            Account
                        ></MaterialCommunityIcons>
                        {info.FoodType}
                    </Text>

                </View>

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
        fontSize: 18,
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
export default AnnouncementDetails;