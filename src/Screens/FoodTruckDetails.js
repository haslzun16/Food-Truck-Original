import React from "react";
import { useState, useEffect } from 'react';
import { FlatList, Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';


const FoodTruckDetails = ({ navigation, route }) => {

	return (
		< View style={{ flex: 1, height: '30%',}} >

			<Image style={ styles.ftPic } source={route.params.item.source} />

				<View style={{
					
				}}>

					<Text
						style={styles.ftName}>
						{route.params.item.name}
					</Text>
					

				</View>
		
		
		</View >
	)
}


const styles = StyleSheet.create({
	ftPic: {
	//	backgroundColor: 'pink',
		width: '100%',
		height: 200,
	},

	ftName: {
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: 30,
		marginTop: '0%',
		color: 'black'
	},

});

export default FoodTruckDetails;