import React from "react";
import { useState, useEffect } from "react";
import {
    FlatList,
    Button,
    View,
    Modal,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import _ from "lodash";

import { AuthContext } from "../../App";






//I changed the linear background to darkish white and the top view to orange

const Home = ({ navigation }) => {
  // Fake Data


  //Food Truck Data
  const foodTruckData = [
    {
      categories: [9],
      source: require("../../assets/FoodTrucks/FoodTruck1.jpg"),
      name: "Amoroso's Bakery",
      time: "10am - 6pm",
      food: "Bakery",
      distance: "1.5 mi",
      id: 1,
    },
    {
      categories: [2, 5],
      source: require("../../assets/FoodTrucks/FoodTruck2.jpg"),
      name: "Tacos Hermanos",
      time: "4pm - 11pm",
      food: "Tacos",
      distance: "1.3 mi",
      id: 2,
    },
    {
      categories: [1],
      source: require("../../assets/FoodTrucks/FoodTruck3.png"),
      name: "Sliders",
      time: "11am - 9pm",
      food: "Burgers",
      distance: "1.8 mi",
      id: 3,
    },
    {
      categories: [1],
      source: require("../../assets/FoodTrucks/FoodTruck4.jpg"),
      name: "PH Burger",
      time: "11am - 7pm",
      food: "Burgers",
      distance: "0.5 mi",
      id: 4,
    },
    {
      categories: [1, 4],
      source: require("../../assets/FoodTrucks/FoodTruck5.jpg"),
      name: "Tuk Truk",
      time: "8am - 5pm",
      food: "Chicken",
      distance: "1.4 mi",
      id: 5,
    },
    {
      categories: [10],
      source: require("../../assets/FoodTrucks/FoodTruck6.jpg"),
      name: "Ruthies",
      time: "2pm - 10pm",
      food: "Drinks, Burgers",
      distance: "2.2 mi",
      id: 6,
    },
    {
      categories: [1, 4],
      source: require("../../assets/FoodTrucks/FoodTruck7.jpg"),
      name: "Big Blue",
      time: "1pm - 11pm",
      food: "Hotdogs, Burgers",
      distance: "1.9 mi",
      id: 7,
    },
    {
      categories: [2, 5],
      source: require("../../assets/FoodTrucks/FoodTruck8.jpg"),
      name: "Sweet Burrito",
      time: "3pm - 9pm",
      food: "Burritos",
      distance: "1.1 mi",
      id: 8,
    },
  ];

  const [foodTrucks, setFoodTrucks] = React.useState(foodTruckData);
  const [venders, setVenders] = React.useState([]);


  React.useEffect(() => {
    getVenders();
  }, []);

  const getVenders = () => {
    
    let menuRef = firebase.database().ref("vender/");

    menuRef.on("value", (snapshot) => {
      let val = snapshot.val();

      let valToArray = _.map(val, (element) => {
        return { ...element };
      });
      console.log(valToArray)
      
      setVenders(valToArray);

    });
  };

  const [search, setSearch] = React.useState('');

  const [filterFoodTrucks, setFilterFoodTrucks] = React.useState(foodTruckData);

  const [menus, setMenus] = React.useState([]);

  const {signOut}= React.useContext(AuthContext);

  //const [filterFoodTrucks, setFilterFoodTrucks] = React.useState([]);

  //  const [masterDataSource, setMasterDataSource] = React.useState([]);


  const { getUserId } = React.useContext(AuthContext);

    let userId = getUserId();

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = () => {
        let menuRef = firebase.database().ref("vender/");

        menuRef.on("value", (snapshot) => {
            let val = snapshot.val();

            let valToArray = _.map(val, (element) => {
                return { ...element };
            });

            setMenus(valToArray);

        });
    };

    const signout = () => {
     signOut()
          
  }








/*    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.FoodTruckName
                    ? item.FoodTruckName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setMenus(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setMenus(masterDataSource);
            setSearch(text);
        }
    };*/





    const searchFilterFunction = (text) => {
        if (text) {
            const newData = filterFoodTrucks.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFoodTrucks(newData);
            setSearch(text);
        } else {
            setFoodTrucks(filterFoodTrucks);
            setSearch(text);
        }
    };




  return (
    <LinearGradient colors={["#F5F5F5", "#F5F5F5"]} style={styles.body}>
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

        {/* This will be the search bar*/}

        <View style={styles.categories}>

                  <TextInput
                      style={styles.textInputStyle}
                      //value={search}
                      placeholder="Search Food Trucks"
                      //onChangeText={updateSearch()}
                      onChangeText={(text) => searchFilterFunction(text)}
                      onClear={(text) => searchFilterFunction('')}
                      value={search}

           />
           <View style={styles.view2}>
              {/* If correct credentials go to the homepage via bottom navigation */}
              <TouchableOpacity
                onPress={() => signout() }
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>

        </View>

        {/* Line that separates categories Flatlist and Food Truck Flatlist */}

        <View style={{ height: 1, backgroundColor: "#F5AF19" }} />

        {/*<FlatList style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#FC5976' }} */}

        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => `${item.id}`}
                 // keyExtractor={(item, index) => index.toString()}
                  //data={menus}
                  data={foodTrucks}
          renderItem={({ item }) => (
            <View>
              {/*When clicked go to Food Truck Details */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FoodTruckDetails", {
                    item,
                  })
                }
              >
                {/* <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#F5F5F5', marginTop: 10, borderRadius: 20 }}> */}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    borderRadius: 20,
                    marginBottom: 20,
                    padding: 5,
                    borderRadius: 12,
                    //        backgroundColor: 'red',
                    backgroundColor: "rgba(255, 255, 255, 0.8",
                    //   shadowOffset: {
                    //       width: 0,
                    //       height: 10
                    //   },
                    //   shadowColor: "#000",
                    //  shadowOpacity: 1,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 20 },
                    shadowColor: "black",
                    shadowOpacity: 1,
                    elevation: 4,
                    // background color must be set
                    //  backgroundColor: "#0000" // invisible color
                  }}
                >
                  {/* Food Truck Image */}
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
                              {/*Food Truck Name */}
                              {/* <Text style={styles.flatListItem2}>{item.FoodTruckName}</Text>  */}
                              <Text style={styles.flatListItem2}>{item.name}</Text>

                    <View style={{ flexDirection: "row" }}>
                      {/*Food Truck Category */}
                          <View style={{ flexDirection: "row" }}>
                                      {/*   <Text style={styles.flatListItem3}>{item.FoodType}</Text> */}
                                      <Text style={styles.flatListItem3}>{item.food}</Text>
                                  </View>
                    </View>

                    {/*Food Truck Time */}
                              {/* <Text style={styles.flatListItem3}>{item.LicensePlate}</Text> */}
                              <Text style={styles.flatListItem3}>{item.time}</Text>

                              {/*Food Truck Distance */}
                              {/* <Text style={styles.flatListItem3}>{item.LicensePlate}</Text> */}
                              <Text style={styles.flatListItem3}>{item.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Line that separates Food Trucks */}

              {/*  <View style={{ height: 1, backgroundColor: '#F5AF19' }} /> */}
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
    backgroundColor: "#F5AF19",
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
   // height: "15%",
    //   backgroundColor: '#F5AF19'
    backgroundColor: "#F5F5F5",
  //  alignItems: "center",
   // justifyContent: "center",
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

    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        borderRadius: 15,
        margin: 5,
        borderColor: '#F5AF19',
        backgroundColor: 'white',
    },

});

export default Home;
