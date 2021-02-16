/**
 * Bottom Navigation
 *
 * Navigation to the main app screens 
 *
 */


import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './src/Screens/Home';
import Map from './src/Screens/Map';
import Events from './src/Screens/Events';
import Orders from './src/Screens/Orders';


const Tab = createBottomTabNavigator();


class BottomNavigation extends Component {
    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    style: {
                       // height: '9%',
                       // backgroundColor: this.tabIndex == 4 ? "#fff" : "transparent",
                        backgroundColor: '#FFF',
                        //position: 'absolute',
                        //bottom: 0,
                       // elevation: 0
                    },
                    activeTintColor: '#FEAD44',
                    inactiveTintColor: '#FC5976',
                   // showLabel: false,
                }}>
                {/* First Tab and Screen */}
                <Tab.Screen name="Home" component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#009387',
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" style={{ color: color }} size={26}  />
                        ),
                    }} />
                {/* Second Tab and Screen */}
                <Tab.Screen name="Map" component={Map}
                    options={{
                        tabBarLabel: 'Map',
                        tabBarColor: '#009387',
                        activeTintColor: 'red',
                       inactiveTintColor: 'blue',
                        tabBarIcon: ({ color }) => (
                            <Icon name="map" color={color} size={26} />
                        ),
                    }} />
                {/* Third Tab and Screen */}
                <Tab.Screen name="Events" component={Events} 
                    options={{
                        tabBarLabel: 'Events',
                        tabBarColor: '#009387',
                        tabBarIcon: ({ color }) => (
                            <Icon name="calendar-star" color={color} size={26} />
                        ),
                    }} />
                {/* Last Tab and Screen */}
                <Tab.Screen name="Orders" component={Orders} 
                    options={{
                        tabBarLabel: 'Orders',
                        tabBarColor: '#009387',
                        tabBarIcon: ({ color }) => (
                            <Icon name="cart-outline" color={color} size={26} />
                        ),
                    }} />
                </Tab.Navigator>
        );
    }
};

export default BottomNavigation;