import React from 'react';
import MapboxGL, { LineLayerStyle } from '@react-native-mapbox-gl/maps';
import { StyleProp } from 'react-native';
import Colors from '../consts/Colors';

const lineStyle: StyleProp<LineLayerStyle> = {
	lineWidth: 5,
	lineJoin: 'round',
	lineColor: Colors.blue	
};

const renderRoute = (route: unknown) : JSX.Element => {
	return (
		<MapboxGL.ShapeSource id="shapeSource" shape={route}>
			<MapboxGL.LineLayer id="lineLayer" style={lineStyle}/>
		</MapboxGL.ShapeSource>
	);
};

export default renderRoute;