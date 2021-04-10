import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import Profile from '../screens/Profile/profile';
import Home from '../screens/Home/home';

type RootNavParamList = {
	Home: undefined,
	Profile: undefined
};

export type HomeScreenNavProp = DrawerNavigationProp<RootNavParamList, 'Home'>;
export type ProfileScreenNavProp = DrawerNavigationProp<RootNavParamList, 'Profile'>;

const Drawer = createDrawerNavigator<RootNavParamList>();

export const DrawerNavigation = () : JSX.Element => { //any is not a good type
	//get to know what is a return of this function component
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Profile" component={Profile} />
		</Drawer.Navigator>
	);
};

//export default DrawerNavigation; //do zmiany