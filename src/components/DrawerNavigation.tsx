import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../screens/Profile/profile';
import Home from '../screens/Home/home';

const Drawer = createDrawerNavigator();

const DrawerNavigation: any = () => { //any is not a good type
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Profile" component={Profile} />
		</Drawer.Navigator>
	);
}

export default DrawerNavigation;