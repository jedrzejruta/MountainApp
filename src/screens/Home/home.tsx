import React from "react";
import { Button, View } from 'react-native';

const Home = ({ navigation } : any) => {
	return (
		<View>
			<Button onPress={() => navigation.navigate('Profile')} title="Profile"/>
		</View>
	);
};

export default Home;