import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { ProfileScreenNavProp } from '../components/DrawerNavigation';
import AuthUser from '../components/UserAuth';
import stylesheet from '../styles/Style';

type ProfileScreenProps = {
	navigation: ProfileScreenNavProp;
};

const Profile = ({ navigation } : ProfileScreenProps) : JSX.Element => {
	return (
		<SafeAreaView style={{...stylesheet.container, paddingHorizontal: 10}}>
			<Button onPress={() => navigation.goBack()} title="Go back to home"/>
			<AuthUser/>
		</SafeAreaView>
	);
};

export default Profile;