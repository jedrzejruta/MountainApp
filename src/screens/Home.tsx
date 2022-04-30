import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HomeScreenNavProp } from '../components/DrawerNavigation';
import MapboxView from '../components/MapboxView';
import Colors from '../consts/Colors';
import stylesheet from '../styles/Style';

type HomeProps = {
	navigation: HomeScreenNavProp;
};

const Home = ({navigation} : HomeProps) : JSX.Element => {
	return (
		<SafeAreaView style={stylesheet.container}>
			<StatusBar
				backgroundColor={Colors.blue}
				barStyle={'dark-content'}
				hidden={false}
			/>
			<View style={{flexDirection: 'row', ...stylesheet.flexCenter}}>
				<Text style={{color: Colors.black, paddingRight: 20}}>Open drawer navigation</Text>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<MaterialIcons name="menu" size={24} color="black" />
				</TouchableOpacity>
			</View>
			<MapboxView />
		</SafeAreaView>
	);
};

export default Home;