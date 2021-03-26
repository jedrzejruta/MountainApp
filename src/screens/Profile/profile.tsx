import React from "react";
import { Button, View } from 'react-native';

const Profile = ({ navigation } : any) => {
	return (
		<View>
			<Button onPress={() => navigation.goBack()} title="Go back to home"/>
		</View>
	);
};

export default Profile;