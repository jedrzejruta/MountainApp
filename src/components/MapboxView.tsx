import React, { useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View, useWindowDimensions, StyleSheet} from 'react-native';

MapboxGL.setAccessToken('pk.eyJ1IjoiamVkcnplanJ1dGEiLCJhIjoiY2tuYm85dmlwMDR5MjJvb2E5Z2pqbXRwYSJ9.D0qd98hCjLaVsMxTJwupnQ');

const MapboxView = () : JSX.Element => {

	useEffect(() => {
		MapboxGL.setTelemetryEnabled(false);
		
	}, []);

	const windowSize = useWindowDimensions();

	const style = StyleSheet.create({
		container: {
			width: windowSize.width,
			height: windowSize.height
		},
		map: {
			flex: 1
		}
	});

	return (
		<View style={style.container}>
			<MapboxGL.MapView
				style={style.map}
				styleURL={MapboxGL.StyleURL.Outdoors}>
				<MapboxGL.Camera
					zoomLevel={5}
					centerCoordinate={[20,49]} />
				<MapboxGL.UserLocation
					visible={true}
					showsUserHeadingIndicator={true} />
			</MapboxGL.MapView>
		</View>
	);
};

export default MapboxView;