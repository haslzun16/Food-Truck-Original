/**
 * Home Screen
 *
 * First Screen the user will see when they sign in
 * Navigation to user account
 * Will display:
 *
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {
  FlatList,
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Component } from "react";
//import { auth } from "../firebase";

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([
    {
      name: "Hamburger",
      source: require("../../assets/Food/Hamburger.png"),
      id: "1",
    },
    { name: "Taco", source: require("../../assets/Food/Taco.png"), id: "2" },
    { name: "Pizza", source: require("../../assets/Food/Pizza.png"), id: "3" },
    {
      name: "Hot Dogs",
      source: require("../../assets/Food/HotDog.png"),
      id: "4",
    },
    {
      name: "Nachos",
      source: require("../../assets/Food/Nachos.png"),
      id: "5",
    },
    { name: "Sushi", source: require("../../assets/Food/Sushi.png"), id: "6" },
    {
      name: "Vegan",
      source: require("../../assets/Food/VeganFood.png"),
      id: "7",
    },
    {
      name: "Rice",
      source: require("../../assets/Food/RiceBowl.png"),
      id: "8",
    },
  ]);

  const [venders, setVenders] = useState([]);

  useEffect(() => {
    getVenders();
  }, []);

  const getVenders = () => {
    
    let menuRef = firebase.database().ref("vender/");

    menuRef.on("value", (snapshot) => {
      let val = snapshot.val();

      let valToArray = _.map(val, (element) => {
        return { ...element };
      });
      
      
      setVenders(valToArray);

      console.log(venders[0].FullName)

    });
  };

   const logout = () => {
        auth
            .signOut()
            .then(() => console.log("User signed out"))
        navigation.replace('SignIn');

    }

  return (
    <LinearGradient colors={["#F5AF19", "#FC5976"]} style={styles.body}>
      <View style={styles.MainView}>
        <View style={styles.Top}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF" }}> Home </Text>

            {/*<Image
                            style={{ width: 85, height: 45, alignItems: 'center', marginTop: 0 }}
                            source={require('../../assets/orange-food-truck.png')}
                            resizeMode={'cover'} />  */}
          </View>
          {/* Click profile image to navigate to account screen*/}
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={styles.button}
          >
            <Image
              style={styles.profilePic}
              source={require("../../assets/default.png")}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>

        {/* This View will have the types of foods above the list view and under the pink line*/}

        <View style={styles.categories}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    //  backgroundColor: (selectedCategory?.id == item.id) ? '#F5AF19' : 'white',
                    borderRadius: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    width: 50,
                    margin: 10,
                  }}
                >
                  {/* <View 
                                         style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 25,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "white"
                                        }}> 

                                    </View> */}

                  <Image
                    source={item.source}
                    resizeMode="contain"
                    style={{
                      marginTop: 30,
                      width: "50%",
                      height: "50%",
                    }}
                  ></Image>

                  <Text
                    style={{
                      position: "relative",
                      marginTop: 12,
                      color: "black",
                      fontSize: 9,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Line that separates categories Flatlist and Food Truck Flatlist */}

        <View style={{ height: 1, backgroundColor: "#F5AF19" }} />

        {/*<FlatList style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#FC5976' }} */}

        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={venders}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetails", {
                    item,
                  })
                }
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <Image
                    source={item.source}
                    style={{
                      width: 200,
                      height: 100,
                      margin: 5,
                      borderRadius: 5,
                    }}
                  ></Image>

                  <View
                    style={{ flex: 1, flexDirection: "column", height: 100 }}
                  >
                    <Text style={styles.flatListItem2}>{item.name}</Text>

                    <Text style={styles.flatListItem}>{item.food}</Text>

                    <Text style={styles.flatListItem3}>{item.time}</Text>

                    <Text style={styles.flatListItem3}>{item.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Line that separates Food Trucks */}

              <View style={{ height: 1, backgroundColor: "#F5AF19" }} />
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#2193b0",
  },

  MainView: {
    flex: 1,
    alignContent: "center",
  },

  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8%",
    //backgroundColor: '#000',
    color: "#fff",
    // borderColor: '#FC5976',
    //  borderBottomWidth: 1,
    // borderTopWidth: 1,
  },

  profilePic: {
    height: 38,
    width: 38,
    margin: 12,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#F5F5F5",
  },

  img: {
    width: 280,
    height: 146,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#000",
  },

  categories: {
    height: "15%",
    //   backgroundColor: '#F5AF19'
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
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
    // marginLeft: 20,
    fontSize: 14,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: "auto",
  },

  flatListItem: {
    color: "black",
    marginTop: "auto",
    //  padding: 0,
    fontSize: 16,
    textAlign: "center",
    marginRight: "auto",
  },
});

export default Home;
