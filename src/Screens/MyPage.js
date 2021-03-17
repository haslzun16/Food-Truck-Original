import React from "react";
import { useState, useEffect } from 'react';
import { FlatList, Button, View, Modal, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase';

import _ from 'lodash';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { FloatingAction } from "react-native-floating-action";

import Swipeout from 'react-native-swipeout'



const MyPage = ({ navigation, route }) => {




	// const [image, setImage] = useState(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setNewImage(result.uri);
		}
	};










	const [modalVisible, setModalVisible] = useState(false);

	const [newImage, setNewImage] = useState(' ');

	const [newName, setNewName] = useState(' ');

	const [newPrice, setNewPrice] = useState(' ');

	const [newDescription, setNewDescription] = useState(' ');

	const [menus, setMenus] = useState([]);


	useEffect(() => {
		getMenus();
	}, []);

	const getMenus = () => {
		let menuRef = firebase.database().ref('/menus/');

		menuRef.on('value', snapshot => {
			let val = snapshot.val();

			let valToArray = _.map(val, element => {
				return { ...element };
			});
			setMenus(valToArray);
		});
	};

	const insertMenu = () => {
		setModalVisible(false);

		let menuRef = firebase.database().ref('/menus/');

		let createdMenu = menuRef.push();

		let menu = { id: createdMenu.key, image: newImage, name: newName, price: newPrice, description: newDescription };

		createdMenu
			.set(menu)
			.then(res => {
				setNewName('');
				setNewPrice('');
				setNewDescription('');
				setNewImage('');
			})
			.catch(err => console.log(err));
	};

	const updateMenu = item => {
		let menuRef = firebase.database().ref('/menus/' + item.id);

		menuRef
			.update({ done: !item.done })
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const deleteMenu = item => {
		let menuRef = firebase.database().ref('/menus/' + item.id);

		menuRef
			.remove()
			.then()
			.catch();
	};




















const foodTruckData = [
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 1 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 2 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 3 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 4 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 5 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 6 },
	{ source: require('../../assets/FoodMenu/VANILLA-CUPCAKES.jpg'), name: "Vanilla Cupcake", description: 'Delicious Vanilla cupcake with sprinkles', food: 'Bakery', price: '$1.50', id: 7 },

]

	const [foodTrucks, setFoodTrucks] = React.useState(foodTruckData)

	const editPageNavigation = () => {
		navigation.navigate('EditMyPage')
	}



	return (
		< View style={{ flex: 1 }} >


			<Modal visible={modalVisible}>
				<View style={styles.modal}>
					{/*	<Button title="Pick an image from camera roll" onPress={pickImage} />
					{newImage && <Image source={{ uri: newImage }} style={{ width: 200, height: 200 }} />}   */}

					<TextInput
						placeholder="Food Name"
						style={styles.textInput}
						
						onChangeText={text => setNewName(text)}
					/>
					<TextInput
						placeholder="Food Price"
						style={styles.textInput}
						
						onChangeText={text => setNewPrice(text)}
					/>
					<TextInput
						placeholder="Food Description"
						style={styles.textInput}
						
						onChangeText={text => setNewDescription(text)}
					/>
					<View style={{flexDirection: 'row', }}>
						
						<View style={styles.view2} >
							{/* If correct credentials go to the homepage via bottom navigation */}
							<TouchableOpacity
								onPress={() => setModalVisible(false)} style={styles.button}>
								<Text style={styles.buttonText}>
									Cancel
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.view2} >
							{/* If correct credentials go to the homepage via bottom navigation */}
							<TouchableOpacity
								onPress={() => insertMenu()} style={styles.button}>
								<Text style={styles.buttonText}>
									Confirm
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>





			<View style={styles.Top}>
				<ImageBackground
					source={require('../../assets/FoodTrucks/FoodTruck1.jpg')}
					//	resizeMode="contain"
					style={styles.TopImage
					} />
				
				
			</View>

			
			<View style={styles.Mid}>

				<Text style={styles.FoodTruckName} > Amoroso's Bakery </Text>

				<Text style={styles.Location} > 1400 Spring Garden St, Greensboro NC 27412 </Text>






				<View style={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
				}}>

					<TouchableOpacity
						style={{
							  backgroundColor: '#F5AF19',
						   // backgroundColor: (selectedCategory?.id == item.id) ? '#F5AF19' : 'white',
							borderRadius: 200,
							alignItems: 'center',
							justifyContent: 'center',
							height: 50,
							width: 50,
							margin: 0,
							//marginRight: '50%'
						}}

						onPress={editPageNavigation}
					>

						<MaterialCommunityIcons name="account-edit"
							style={{
								alignSelf: 'center',
								marginTop: 30,
								width: '50%',
								height: '50%'}} size={26} Account >

						</MaterialCommunityIcons>
					   
						<Text
							style={{
								position: "relative",
								marginTop: 12,
								color: "black",
								fontSize: 9
							}}>

							Edit Page
						</Text>

					</TouchableOpacity>


					<View style={{ alignSelf: 'center' }}>
				<TouchableOpacity
					style={{
						backgroundColor: '#F5AF19',
						// backgroundColor: (selectedCategory?.id == item.id) ? '#F5AF19' : 'white',
						borderRadius: 200,
						alignItems: 'center',
						justifyContent: 'center',
						height: 50,
						width: 50,
						margin: 10,
					}}
					onPress={() => setModalVisible(true)}
				>

					<MaterialCommunityIcons name="silverware"
						style={{
							alignSelf: 'center',
							marginTop: 30,
							width: '50%',
							height: '50%'
						}} size={26} Account >

					</MaterialCommunityIcons>

					<Text
						style={{
							position: "relative",
							marginTop: 12,
							color: "black",
							fontSize: 9
						}}>
						Add Food
						</Text>

				</TouchableOpacity>
			</View>


					<TouchableOpacity
						style={{
							backgroundColor: '#F5AF19',
							// backgroundColor: (selectedCategory?.id == item.id) ? '#F5AF19' : 'white',
							borderRadius: 200,
							alignItems: 'center',
							justifyContent: 'center',
							height: 50,
							width: 50,
						//	margin: 10,
						}}

					// onPress={() => onSelectCategory(item)}
					>

						<MaterialCommunityIcons name="calendar-clock"
							style={{
								alignSelf: 'center',
								marginTop: 30,
								width: '50%',
								height: '50%'
							}} size={26} Account >

						</MaterialCommunityIcons>

						<Text
							style={{
								position: "relative",
								marginTop: 12,
								color: "black",
								fontSize: 9
							}}>

							Schedule
						</Text>

					</TouchableOpacity>

				</View>
				

			</View>
			<View style={{ height: 1, backgroundColor: '#F5AF19' }} />

			<View style={styles.Bottom} >

				<FlatList
					numColumns={1}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => `${item.id}`}
					data={menus}
					renderItem={({ item }) => (
						<View>

							{/*When clicked go to Food Truck Details  */}
							<TouchableOpacity

								onPress={() => updateMenu(item)}
								onLongPress={() => deleteMenu(item)}
							>

								<View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#F5F5F5', marginTop: 10, borderRadius: 20 }}>

									{/* Food Truck Image */}
									<Image source={item.image} style={{ width: 100, height: 100, margin: 5, borderRadius: 5 }}></Image>

									<View style={{ flex: 1, flexDirection: 'column', height: 100 }}>

										{/* Food Truck Name */}
										<Text style={styles.flatListItem2}>{item.name}</Text>

										<View style={{ flexDirection: 'row' }}>



										</View>

										{/* Food Truck Time */}
										<Text style={styles.flatListItem3}>{item.price}</Text>

										{/* Food Truck Distance */}
										<Text style={styles.flatListItem3}>{item.description}</Text>

									</View>

								</View>

							</TouchableOpacity>

							{/* Line that separates Food Trucks */}

							<View style={{ height: 1, backgroundColor: '#F5AF19' }} />

						</View>
					)}
				/>
				
			</View>

		</View >
	)
}


const styles = StyleSheet.create({
	Top: {
		height: '30%',
		width: '100%',
		backgroundColor: 'black'
	},

	TopImage: {
		height: '100%',
		width: '100%',
	},

	Mid: {
		height: '30%',
		width: '100%',
		//backgroundColor: 'yellow'
	},

	FoodTruckName: {
		fontSize: 30,
		alignSelf: 'center',
	},

	Location: {
		fontSize: 14,
		alignSelf: 'center',
	},

	Bottom: {
		height: '40%',
		width: '100%',
		//backgroundColor: 'blue'
	},

	 flatListItem2: {
		color: 'black',
		paddingLeft: 0,
		fontSize: 20,
	},

	flatListItem3: {
		color: 'black',
		paddingRight: 20,
		marginTop: 5,
		// marginLeft: 20,
		fontSize: 14,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginTop: 'auto',
	},

	flatListItem: {
		color: 'black',
		marginTop: 'auto',
		//  padding: 0,
		fontSize: 16,
		textAlign: 'center',
		marginRight: 'auto',
	},

	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textInput: {
		width: 300,
		borderWidth: 1,
		borderRadius: 20,
		height: 50,
		padding: 10,
		margin: 5
	},

	buttonSection: {
		height: 150,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	view2: {
		marginTop: 0,
		alignItems: 'center',
		padding: 10,
	},
	button: {
		width: 100,
		height: 40,
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: '#FEAD44',
	},

	buttonText: {
		//position: 'absolute',
		//paddingLeft: 60,
		fontSize: 18,
		textAlign: 'center',
		margin: 5,
		color: '#FFFFFF',
	},

});

export default MyPage;