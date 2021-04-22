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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as firebase from "firebase";
import _ from "lodash";
import * as ImagePicker from "expo-image-picker";
import Swipeout from "react-native-swipeout";
import { AuthContext } from "../../App";

const MyPage = ({ navigation, route }) => {

    const [theID, setTheID] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [locationVisible, setLocationVisible] = useState(false);
    const [announcementVisible, setAnnouncementVisible] = useState(false);
    const [newLocation, setLocation] = useState(null);
    const [NewAnnouncement, setNewAnnouncement] = useState(" ");
    const [newName, setNewName] = useState(" ");
    const [newPrice, setNewPrice] = useState(" ");
    const [newDescription, setNewDescription] = useState(" ");
    const [info, setInfo] = useState([]);
    const [menus, setMenus] = useState([]);
    const { getUserId } = React.useContext(AuthContext);
    const [tempImage, setTempImage] = useState("");

    let userId = getUserId();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }

        })();
    }, []);
    //method to obtain to get the new location if changed or want to change to a new location
    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('location', newLocation.coords.latitude);
    };
    //storing location to data base
    const storeLocation = () => {
        setLocationVisible(false);
        let locationRef = firebase.database()
            .ref("vender/" + userId + "/location")
            .update({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
            })
            .catch((err) => console.log(err));

    }

    //store the vendor announcements
  const storeAnnouncement = () => {
    setAnnouncementVisible(false);
    console.log(userId)
    let announcementRef = firebase.database().ref("announcements/");
    let createdAnnouncemnt = announcementRef.push();
    
    let announcement = {
      id: createdAnnouncemnt.key,
      announcement: NewAnnouncement,
      userid: userId,
      vendorname: getName(),
      timestamp: Date.now(),
      
    };
  
    createdAnnouncemnt
      .set(announcement)
      .then((res) => {
        setNewAnnouncement("");
      })
      .catch((err) => console.log(err));
  };
  
  const getName = () => {
    let name = "";
    let menuRef = firebase.database().ref("vender/" + userId + "/FoodTruckName");
    menuRef.on("value", (snapshot) => {

        let val = snapshot.val();
        name = val
       
    });

    
    return name
};

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

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {

        let infoRef = firebase.database().ref("vender/" + userId);

        infoRef.on('value', function (snapshot) {

            setInfo(snapshot.val());

        }); 

    };

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = () => {
        let menuRef = firebase.database().ref("vender/" + userId + "/menu");
        menuRef.on("value", (snapshot) => {
            let val = snapshot.val();
            let valToArray = _.map(val, (element) => {
                return { ...element };
            });

            setMenus(valToArray);
        });

    };

    const insertMenu = (url) => {
        setModalVisible(false);
        let menuRef = firebase.database().ref("vender/" + userId + "/menu");
        let createdMenu = menuRef.push();

        let menu = {
            id: createdMenu.key,
            image: url,
            name: newName,
            price: newPrice,
            description: newDescription,
        };

        createdMenu
            .set(menu)
            .then((res) => {
                setNewName("");
                setNewPrice("");
                setNewDescription("");
                setTempImage("");

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
            .child(userId + "/foodImages/" + newName)
            .put(blob).then((snapshot) => {

                snapshot.ref.getDownloadURL()
                    .then(url => {

                        console.log(' * new url', url)

                        insertMenu(url);

                    })
            });
    };

    const updateMenu = (theID, url) => {
        setModalVisible2(false);

        const imageRef = firebase.database();
        imageRef.ref("vender/" + userId + "/menu/" + theID.id)
            .update({ image: url })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        
        const nameRef = firebase.database();
        nameRef.ref("vender/" + userId + "/menu/" + theID.id)
            .update({ name: newName })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        const priceRef = firebase.database();
        priceRef.ref("vender/" + userId + "/menu/" + theID.id)
            .update({ price: newPrice })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        const descriptionRef = firebase.database();
        descriptionRef.ref("vender/" + userId + "/menu/" + theID.id)
            .update({ description: newDescription })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };




    // T0-Do you need to add a loading screen because the uploading image kinda takes time to upload
    //method to upload image to database then it downloads the image and sends the url to insertmenu method
    const updateImageToStorage = async () => {
        let response = await fetch(tempImage);
        let blob = await response.blob();

        firebase
            .storage()
            .ref()
            .child(userId + "/foodImages/" + newName)
            .put(blob).then((snapshot) => {

                snapshot.ref.getDownloadURL()
                    .then(url => {

                        console.log(' * new url', url)

                        updateMenu(theID, url);

                    })
            });
    };





    const deleteMenu = (item) => {

        let menuRef = firebase
            .database()
            .ref("vender/" + userId + "/menu/" + item.id);
        //deleting the item
        menuRef.remove().then(() => {
            // File deleted successfully
            console.log('item deleted successfully')
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('an error occurred!')
        });

        //deleting the image
        var imageRef =
            firebase
                .storage()
                .ref().child(userId + "/foodImages/" + item.name);
        // Delete the file
        imageRef.delete().then(() => {
            // File deleted successfully
            console.log('File deleted successfully')
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('an error occurred!')
        });
    };


    const insertFoodTruckImage = (url) => {
        setModalVisible3(false);

        let foodTruckImageRef = firebase.database().ref("vender/" + userId);
        let createdFoodTruckImage = foodTruckImageRef
        let foodTruckImage = {
            foodTruckImage: url,
        };
        createdFoodTruckImage
            .update(foodTruckImage)
            .then((res) => {
                setTempImage("");
            })
            .catch((err) => console.log(err));

    };

    // T0-Do you need to add a loading screen because the uploading image kinda takes time to upload
    //method to upload image to database then it downloads the image and sends the url to insertmenu method
    const uploadImageToStorage2 = async () => {
        let response = await fetch(tempImage);
        let blob = await response.blob();

        firebase
            .storage()
            .ref()
            .child(userId + "/FoodTruckImage/" + info.FoodTruckName)
            .put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then(url => {
                        console.log(' * new url', url)
                        insertFoodTruckImage(url);
                    })
            });
    };








    const editPageNavigation = () => {
     //   navigation.navigate("EditMyPage");
    };

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => {

        var swipeoutRightBtns = [
            {
              backgroundColor: "#F5AF19",
              onPress: () => {
                  deleteMenu(item)
              },
                  text:'Delete'
            }
        ];
        return (
            <View>
                <Swipeout right={swipeoutRightBtns}  backgroundColor="#fff">
                <View>
                    {/*When clicked go to Open the Modal  */}
                    <TouchableOpacity
                            onPress={() => {
                                setModalVisible2(true), setTheID(item), setTempImage(item.image), setNewName(item.name),
                                setNewPrice(item.price),
                                setNewDescription(item.description), console.log(theID.name) }}
                        //onLongPress={() => deleteMenu(item)}
                    >
                        <View
/*                            style={{
                                flex: 1,
                                flexDirection: "row",
                                backgroundColor: "#F5F5F5",
                                marginTop: 10,
                                borderRadius: 20,
                            }}*/


                            style={{
                       /*         flex: 1,
                                flexDirection: "row",
                                marginTop: 10,
                                borderRadius: 20,
                                marginBottom: 20,
                                padding: 5,
                                borderRadius: 12,
                                //        backgroundColor: 'red',
                             //   backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                                elevation: 2, */


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
            </Swipeout>

            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>




            <Modal visible={modalVisible3}>
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
                                onPress={() => setModalVisible3(false)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view2}>
                            {/* Add Profile Image to the database */}
                            <TouchableOpacity
                                onPress={() => uploadImageToStorage2()}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>





                <Modal visible={modalVisible2}>
                    <View style={styles.modal}>
                        <Button title="Pick an image from camera roll" onPress={pickImage} />
                    <Image
                        source={{ uri: tempImage ? tempImage : "../../assets/NoImage.png" }}
                        //source={{ uri: theID.image ? theID.image : "../../assets/NoImage.png" }}
                        style={{ width: 200, height: 200 }} />

                        <TextInput
                            placeholder="Food Name"
                            style={styles.textInput}
                            onChangeText={text => setNewName(text)}
                            defaultValue={theID.name}
                        />

                        <TextInput
                            keyboardType="numeric"
                            placeholder="Food Price"
                            style={styles.textInput}
                            onChangeText={text => setNewPrice(text)}
                            defaultValue={theID.price}
                        />

                        <TextInput
                            placeholder="Food Description"
                            style={styles.textInput}
                            onChangeText={text => setNewDescription(text)}
                            defaultValue={theID.description}
                        />

                        <View style={{ flexDirection: 'row', }}>

                            <View style={styles.view2} >
                                {/* Closes the Modal */}
                                <TouchableOpacity
                                    onPress={() => setModalVisible2(false)} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Cancel
								    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.view2} >
                                {/* Updates the menu */}
                            <TouchableOpacity
                                onPress={() => updateImageToStorage()} style={styles.button}>

                                    <Text style={styles.buttonText}>
                                        Confirm
								    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
 
            <Modal visible={modalVisible}>
                <View style={styles.modal}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    <Image
                       // source={{ uri: tempImage }}
                        source={{ uri: tempImage ? tempImage : "../../assets/NoImage.png" }}
                        style={{ width: 200, height: 200 }}
                    />
                    <TextInput
                        placeholder="Food Name"
                        style={styles.textInput}
                        onChangeText={(text) => setNewName(text)}
                    />

                    <TextInput
                        keyboardType="numeric"
                        placeholder="Food Price"
                        style={styles.textInput}
                        onChangeText={(text) => setNewPrice(text)}
                    />

                    <TextInput
                        placeholder="Food Description"
                        style={styles.textInput}
                        onChangeText={(text) => setNewDescription(text)}
                    />

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.view2}>
                            {/* Close and Cancel the Modal */}
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.view2}>
                            {/* Add Food Menu to the database */}
                            <TouchableOpacity
                                onPress={() => uploadImageToStorage()}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={locationVisible}>
                <View style={styles.modal}>
                    <Text>Your new location: {JSON.stringify(newLocation)}</Text>

                    <Button title="Click me to get current location" onPress={getLocation} style={styles.buttonLocation} />

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.view2}>
                            {/* If correct credentials go to the homepage via bottom navigation */}
                            <TouchableOpacity
                                onPress={() => setLocationVisible(false)}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view2}>
                            {/* If correct credentials go to the homepage via bottom navigation */}
                            <TouchableOpacity
                                onPress={() => storeLocation()}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

      <Modal visible={announcementVisible}>
        <View style={styles.modal}>
          <Text>Post an announcement for customers!</Text>
          <TextInput
            placeholder="Enter Your Annoucement"
            style={styles.textInput}
            onChangeText={(text) => setNewAnnouncement(text)}
          />

          <View style={{ flexDirection: "row" }}>
            <View style={styles.view2}>
              {/* If correct credentials go to the homepage via bottom navigation */}
              <TouchableOpacity
                onPress={() => setAnnouncementVisible(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.view2}>
              {/* If correct credentials go to the homepage via bottom navigation */}
              <TouchableOpacity
                onPress={() => storeAnnouncement()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Post!</Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
      </Modal>

            <View style={styles.Top}>



                <TouchableOpacity
                    onPress={() => setModalVisible3(true)}>
                <ImageBackground
                    // source={require("../../assets/FoodTrucks/FoodTruck1.jpg")}
                    source={{ uri: info.foodTruckImage ? info.foodTruckImage : null }}
                    style={styles.TopImage}
                />
                </TouchableOpacity>



            </View>
            <View style={styles.Mid}>
                <Text style={styles.FoodTruckName}> {info.FoodTruckName} </Text>
                <Text style={styles.Location}>
                    {info.FoodTruckLocation}
                </Text>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
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
                        onPress={editPageNavigation}
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
                            Edit Page
                        </Text>
                    </TouchableOpacity>
                    <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F5AF19",
                                borderRadius: 200,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                margin: 10,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialCommunityIcons
                                name="silverware"
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
                                Add Food
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#F5AF19",
                                borderRadius: 200,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                margin: 10,
                            }}
                            onPress={() => setLocationVisible(true)}
                        >
                            <MaterialCommunityIcons
                                name="map-marker-radius"
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
                                Location Change
                            </Text>
                        </TouchableOpacity>
                    </View>
         <TouchableOpacity
            style={{
              backgroundColor: "#F5AF19",
              // backgroundColor: (selectedCategory?.id == item.id) ? '#F5AF19' : 'white',
              borderRadius: 200,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              //	margin: 10,
            }}

            onPress={() => setAnnouncementVisible(true)}
          >
            <MaterialCommunityIcons
              name="message-plus"
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
                width: '160%',
                marginLeft: 20
              }}
            >
              Post Announcements
            </Text>
          </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: "#F5AF19" }} />

            <View style={styles.Bottom}>
                <FlatList
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    //keyExtractor={(item) => item.id.toString()}
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
        height: "30%",
        width: "100%",
        backgroundColor: "white"
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
        height: "40%",
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