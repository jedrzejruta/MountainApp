import React from 'react';
import { Button, SafeAreaView} from 'react-native';
import { ProfileScreenNavProp } from '../components/DrawerNavigation';

type ProfileScreenProps = {
	navigation: ProfileScreenNavProp;
};

const Profile = ({ navigation } : ProfileScreenProps) : JSX.Element => {
	return (
		<SafeAreaView>
			<Button onPress={() => navigation.goBack()} title="Go back to home"/>
		</SafeAreaView>
	);
};

export default Profile;