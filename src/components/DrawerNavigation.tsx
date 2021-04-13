import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import Home from '../screens/Home';

type RootNavParamList = {
	Home: undefined,
	Profile: undefined
};

export type HomeScreenNavProp = DrawerNavigationProp<RootNavParamList, 'Home'>;
export type ProfileScreenNavProp = DrawerNavigationProp<RootNavParamList, 'Profile'>;

const Drawer = createDrawerNavigator<RootNavParamList>();

export const DrawerNavigation = () : JSX.Element => { //any is not a good type
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Profile" component={Profile} />
		</Drawer.Navigator>
	);
};

//export default DrawerNavigation; //do zmiany