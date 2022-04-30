import React from 'react';
import { View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import stylesheet from '../styles/Style';

const renderPoint = (point: GeoJSON.Position, pointInfo: string) : JSX.Element => {
	return (
		<MapboxGL.PointAnnotation
			key={'point'}
			id={'point'}
			coordinate={point}>
			<Text>{pointInfo}</Text>
			<View style={stylesheet.pointStyle} />
			<MapboxGL.Callout title={`${pointInfo}`} />
		</MapboxGL.PointAnnotation>
	);
};

const renderPoints = (points: number[][]) : JSX.Element[] => {
	return (
		points.map((point: number[], index: number) => (
			<MapboxGL.PointAnnotation
				key={`${index}-Point`}
				id={`${index}-Point`}
				coordinate={point}> 
				<View style={stylesheet.pointStyle}
				/>
			</MapboxGL.PointAnnotation>
		))
	);
};

export {renderPoint, renderPoints};