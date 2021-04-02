import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import _ from "lodash";


//I changed the linear background to darkish white and the top view to orange

const Home = ({ navigation }) => {
  // Fake Data

  //Category Data
  const categoryData = [
    {
      name: "All",
      source: require("../../assets/Food/EspressoCup.png"),
      id: 100,
    },
    {
      name: "Hamburger",
      source: require("../../assets/Food/Hamburger.png"),
      id: 1,
    },
    { name: "Tacos", source: require("../../assets/Food/Taco.png"), id: 2 },
    { name: "Pizza", source: require("../../assets/Food/Pizza.png"), id: 3 },
    {
      name: "Hot Dogs",
      source: require("../../assets/Food/HotDog.png"),
      id: 4,
    },
    { name: "Nachos", source: require("../../assets/Food/Nachos.png"), id: 5 },
    { name: "Sushi", source: require("../../assets/Food/Sushi.png"), id: 6 },
    {
      name: "Vegan",
      source: require("../../assets/Food/VeganFood.png"),
      id: 7,
    },
    { name: "Rice", source: require("../../assets/Food/RiceBowl.png"), id: 8 },
    {
      name: "Dessert",
      source: require("../../assets/Food/Cupcake.png"),
      id: 9,
    },
    {
      name: "Drinks",
      source: require("../../assets/Food/EspressoCup.png"),
      id: 10,
    },
  ];

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

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
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

  function onSelectCategory(category) {
    //filter restaurant
    let foodTruckList = foodTruckData.filter((a) =>
      a.categories.includes(category.id)
    );

    setFoodTrucks(foodTruckList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category;
    category = categories.filter((a) => a.id == id);

    // if (categories) {

    //}

    if (category.length > 0) {
      return category[0].name;
    }

    return "";
  }

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

        {/* This View will have the types of foods above the list view and under the pink line*/}

        <View style={styles.categories}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    //  backgroundColor: 'white',
                    backgroundColor:
                      selectedCategory?.id == item.id ? "#F5AF19" : "white",
                    borderRadius: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    width: 50,
                    margin: 10,
                  }}
                  onPress={() => onSelectCategory(item)}
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

                  {/*Category Image */}
                  <Image
                    source={item.source}
                    resizeMode="contain"
                    style={{
                      marginTop: 30,
                      width: "50%",
                      height: "50%",
                    }}
                  ></Image>

                  {/*Category Text */}
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
          keyExtractor={(item) => `${item.id}`}
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
                    <Text style={styles.flatListItem2}>{item.name}</Text>

                    <View style={{ flexDirection: "row" }}>
                      {/*Food Truck Category */}
                      {item.categories.map((categoryId) => {
                        return (
                          <View
                            style={{ flexDirection: "row" }}
                            key={categoryId}
                          >
                            <Text>
                              {getCategoryNameById(categoryId) + "," + "  "}
                            </Text>
                          </View>
                        );
                      })}
                    </View>

                    {/*Food Truck Time */}
                    <Text style={styles.flatListItem3}>{item.time}</Text>

                    {/*Food Truck Distance */}
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
