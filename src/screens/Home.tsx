import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { HomeScreenNavProp } from '../components/DrawerNavigation';
import MapboxView from '../components/MapboxView';

type HomeProps = {
	navigation: HomeScreenNavProp;
};

const Home = ({navigation} : HomeProps) :JSX.Element => {
	return (
		<SafeAreaView>
			<Button onPress={() => navigation.openDrawer()} title="open drawer"/>
			<MapboxView />
		</SafeAreaView>
	);
};

export default Home;