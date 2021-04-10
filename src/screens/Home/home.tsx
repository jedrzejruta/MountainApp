import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { HomeScreenNavProp } from '../../components/DrawerNavigation';

type HomeProps = {
	navigation: HomeScreenNavProp;
};


const Home = ({ navigation} : HomeProps) :JSX.Element => {
	return (
		<SafeAreaView>
			<Button onPress={() => navigation.navigate('Profile')} title="Profile"/>
		</SafeAreaView>
	);
};

export default Home;