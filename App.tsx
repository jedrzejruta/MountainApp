import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/components/DrawerNavigation';

export default function App() : JSX.Element {
	return (
		<NavigationContainer>
			<DrawerNavigation />
		</NavigationContainer>
	);
}