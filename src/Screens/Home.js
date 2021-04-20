import React from "react";
import { useState, useEffect, useCallback } from "react";
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
    SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import _ from "lodash";
import { AuthContext } from "../../App";
import { useTheme } from '@react-navigation/native';

const Home = ({ navigation }) => {

  const [search, setSearch] = React.useState('');
  const [findFoodTrucks, setFindFoodTrucks] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
  const [setUp, assignSetUp] = useState();
  const [users, setUsers] = useState([]);
  const [cust, setCust] = useState([]);
  const [vend, setVend] = useState([]);
  const { getUserId } = React.useContext(AuthContext);

    const { colors } = useTheme();

    let userId = getUserId();

    useEffect(() => {
        navigateUser();
    }, []);

    useEffect(() => {
        getCustomers();
    }, []);

    useEffect(() => {
        getVendors();
    }, []); 

    useEffect(() => {

        let isSetUpRef = firebase.database().ref("users/" + userId + "/user");
        isSetUpRef.on("value", (snapshot) => {
            if (snapshot.exists()) {
                assignSetUp(false)
            }
            else {
                assignSetUp(true)
            }
        });
         
        const test = () => {
            if (setUp == true) {
                setUsers(vend);
            } else {
                setUsers(cust);
            }

        }
        setUsers();
        test();

        if (users.profileImage == null) {
            users.profileImage == require("../../assets/default.png");
        }
    }, [users]);

    const navigateUser = () => {

        let isSetUpRef = firebase.database().ref("users/" + userId + "/user");
        isSetUpRef.on("value", (snapshot) => {
            if (snapshot.exists()) {
                assignSetUp(false)
            }
            else {
                assignSetUp(true)
            }
        });
    };

    const getCustomers = () => {
        let userRef = firebase.database().ref("users/" + userId);
        let val = '';
            userRef.on('value', function (snapshot) {
                let val = snapshot.val();
                setCust(val);
                setUsers(cust);
            });
        setCust(val);
    };

    const getVendors = () => {

        let userRef = firebase.database().ref("vender/" + userId);
        let val = '';
        userRef.on('value', function (snapshot) {
            let val = snapshot.val();

            setVend(val);
            setUsers(vend);
        });
        setVend(val);
    };

  useEffect(() => {
      getFoodTrucks();
  }, []);

    const getFoodTrucks = () => {
        let foodTruckRef = firebase.database().ref("vender/");
        foodTruckRef.on("value", (snapshot) => {
            let val = snapshot.val();
            let valToArray = _.map(val, (element) => {
                return { ...element };
            });
            setFindFoodTrucks(valToArray);
            setMasterDataSource(valToArray);
        });
    };

    //Firebase Search
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.FoodTruckName
                    ? item.FoodTruckName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFindFoodTrucks(newData);
            setSearch(text);
        } else {
            setFindFoodTrucks(masterDataSource);
            setSearch(text);
        }
    };




   const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                   // marginLeft: "14%"
                }}
            />
        );
    };




  return (
    <LinearGradient colors={["#F5F5F5", "#F5F5F5"]} style={styles.body}>
      <SafeAreaView style={styles.MainView}>
        <View style={styles.Top}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF" }}> Home </Text>

                  </View>
                  <Text style={{ color: "#FFF"}}>Welcome {users.Fullname} </Text>
          {/* Click profile image to navigate to account screen*/}
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={styles.button}
          >
            <Image
              style={styles.profilePic}
              source={{ uri: users.profileImage ? users.profileImage : null }} 
            />
          </TouchableOpacity>
            
        </View>

        {/* This will be the search bar*/}
        <View style={styles.categories}>

                  <TextInput
                      style={styles.textInputStyle}
                      placeholder="Search Food Trucks"
                      onChangeText={(text) => searchFilterFunction(text)}
                      onClear={(text) => searchFilterFunction('')}
                      value={search}
                  />
        </View>

        {/* Line that separates categories Flatlist and Food Truck Flatlist */}
        <View style={{ height: 1, backgroundColor: "#F5AF19" }} />
        {/*<FlatList style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#FC5976' }} */}

        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          data={findFoodTrucks}
          renderItem={({ item }) => (
            <View style={{backgroundColor:"white"}}>
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
                  {/* Food Truck Image */}
                  <Image
                    source={{ uri: item.foodTruckImage ? item.foodTruckImage : null }}
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
                               <Text style={styles.flatListItem2}>{item.FoodTruckName}</Text>  

                    <View style={{ flexDirection: "row" }}>
                      {/*Food Truck Category */}
                          <View style={{ flexDirection: "row" }}>
                                         <Text style={styles.flatListItem3}>{item.FoodType}</Text> 
                                  </View>
                    </View>

                    {/*Food Truck Time */}
                              {/*    <Text style={styles.flatListItem3}>{item.LicensePlate}</Text> */}

                              {/*Food Truck Distance */}
                              {/*   <Text style={styles.flatListItem3}>{item.LicensePlate}</Text> */}
                  </View>
                </View>
              </TouchableOpacity>
              {/* Line that separates Food Trucks */}

              {/*  <View style={{ height: 1, backgroundColor: '#F5AF19' }} /> */}
            </View>
          )}
        />
      </SafeAreaView>
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
    backgroundColor: "#F5F5F5",
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
    fontSize: 16,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
  },

  flatListItem: {
    color: "black",
    marginTop: "auto",
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
