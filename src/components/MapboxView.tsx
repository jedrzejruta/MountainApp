import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Pressable, Keyboard, Text, LayoutAnimation } from 'react-native';
import { Fontisto, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MAP_API_KEY } from '@env';

import MapboxGL from '@react-native-mapbox-gl/maps';
import { Picker } from '@react-native-picker/picker';

import MapboxDirections from '@mapbox/mapbox-sdk/services/directions';
import { lineString, Position } from '@turf/helpers';

import { request } from './RouteDirection';
import { renderPoints, renderPoint } from './RenderPoints';
import renderRoute from './RenderRoute';

import stylesheet from '../styles/Style';
import { ElevationAPI, GeoCodingOSM } from '../services/GeocodingService';
import { ITime, secondsToTime, metresToReadable } from '../helpers/UnitConverter';

MapboxGL.setAccessToken(MAP_API_KEY);
const directionService = MapboxDirections({accessToken: MAP_API_KEY});

const GeoOSM = new GeoCodingOSM();
const elevationAPI = new ElevationAPI();

const startPoint = [19.92169116916679, 50.04589934205853];
const endPoint = [19.93536659544438, 50.05162830483485];
const bothPoints = [startPoint, endPoint];

const enumStyles = Object.values(MapboxGL.StyleURL);
const enumKeys = Object.keys(MapboxGL.StyleURL);

const MapboxView = (): JSX.Element => {
	const [expanded, setExpanded] = useState(false);
	const [route, setRoute] = useState<GeoJSON.Feature>();
	const [routeDuration, setRouteDuration] = useState<ITime>();
	const [routeDistance, setRouteDistance] = useState<number>();
	const [text, setText] = useState('');
	const [pointInfo, setPointInfo] = useState('');
	const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/outdoors-v11');
	const locations: Position = [];
	const [curLocation, setCurLocation] = useState([
		locations[0] = 20,
		locations[1] = 50
	]);
	const [values, setValues] = useState<GeoJSON.Position>(curLocation);
	const cameraRef = useRef<MapboxGL.Camera>(null);
	const mapRef = useRef<MapboxGL.MapView>(null);

	const fetchData = async () => {
		const response = await directionService.getDirections(request).send();

		const jsonResponse = response.body.routes[0],
			time = jsonResponse.duration,
			distance = jsonResponse.distance,
			newRoute = lineString(jsonResponse.geometry.coordinates);

		setRouteDuration(secondsToTime(time));
		setRouteDistance(metresToReadable(distance));
		setRoute(newRoute);
	};

	useEffect(() => {
		MapboxGL.setTelemetryEnabled(false);
		fetchData();
	}, []);
	
	const pickerDescription = `Map style: ${enumKeys[enumStyles.indexOf(mapStyle as MapboxGL.StyleURL)]}`;
	const MapList = enumStyles.map(i => (
		<Picker.Item label={enumKeys[enumStyles.indexOf(i)]} key={i} value={i} />
	));

	const getCoordinates = async (e : GeoJSON.Feature) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setValues(e.geometry.coordinates);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const point = e.geometry.coordinates;
		const response = await GeoOSM.getGeoPositon(point[1],point[0]);
		const elevation = await elevationAPI.getElevationFromPoint(point[1],point[0]);

		setPointInfo(`${response[0].display_name}, elevation: ${elevation.results[0].elevation} m`);
	};
	
	const flyToLocation = (coords: Position) => {
		cameraRef.current?.setCamera({
			centerCoordinate: coords,
			zoomLevel: 11,
			animationDuration: 3000
		});
	};

	const sendLocationData = (location: MapboxGL.Location) => {
		const latitude = location.coords.latitude,
			longitude = location.coords.longitude;

		setCurLocation([longitude, latitude]);
	};

	const getPlaceResponse = async () => {
		if (text !== '') {
			try {
				const response = await GeoOSM.getGeoAddress(text);
				const bestResponse  = response ? response[0] : null;
				
				if (bestResponse) {
					const pos = [bestResponse.lon, bestResponse.lat];
					const position: Position = pos.map(parseFloat);
					const elevation = await elevationAPI.getElevationFromPoint(position[1],position[0]);
					setValues(position);
					setPointInfo(`${bestResponse.display_name}, ${elevation.results[0].elevation} m`);
					flyToLocation(position);
				}
				else alert(`Nothing found for: ${text}`);
			}
			catch (error) {
				console.error(error);
			}
		}
		else alert('Empty input');
	};

	return (
		<View style={{...stylesheet.container, position: 'relative'}}>

			<MapboxGL.MapView
				style={{...stylesheet.map, position: 'relative'}}
				styleURL={mapStyle}
				ref={mapRef}
				attributionPosition={{top: 10, left: 10}}
				onLongPress={getCoordinates}
			>
				<MapboxGL.Camera
					zoomLevel={6}
					centerCoordinate={curLocation}
					animationMode="flyTo"
					ref={cameraRef}
				/>
				<MapboxGL.UserLocation
					visible={true}
					showsUserHeadingIndicator={true}
					onUpdate={sendLocationData}
				/>
				{ renderPoint(values, pointInfo)}
				{ renderPoints(bothPoints) }
				{ renderRoute(route) }
			</MapboxGL.MapView>

			<View style={{
				position: 'absolute',
				top: 20,
				flexDirection: 'row',
				...stylesheet.flexCenter
			}}>

				<TextInput
					style={stylesheet.input}
					placeholder="Search place"
					returnKeyType="search"
					onFocus={() => setText('')}
					value={text}
					onChangeText={(text) => setText(text)}
				/>
				<Pressable onPress={() => {
					getPlaceResponse();
					Keyboard.dismiss();
				}}
				style={{position: 'absolute', right: 40}} >
					<Ionicons name="search-sharp" size={24} color="black" />
				</Pressable>
			</View>

			<View style={{bottom: 200, left: 20, position: 'absolute'}}>

				<TouchableOpacity onPress={() => flyToLocation(curLocation)} >
					<MaterialIcons name="my-location" size={24} color="black" />
				</TouchableOpacity>

			</View>

			<View style={{bottom: 150, left: 20, position: 'absolute'}}>

				<Fontisto name="map" size={24} color="black" style={{position: 'absolute', top: 20}}/>
				<Picker
					style={{width: 30, height: 24, backgroundColor: 'transparent'}}
					prompt={pickerDescription}
					selectedValue={mapStyle}
					onValueChange={(itemValue) => {
						setMapStyle(itemValue);
					}}
				>
					{MapList}
				</Picker>

			</View>

			<View style={stylesheet.bottomExpandView}>

				<Pressable onPress={() => {
					LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
					setExpanded(!expanded);
				}}>
					<Text style={{fontSize: 20, fontWeight: '700'}}>Route details: 
						{expanded ? 
							<Ionicons name="ios-chevron-down-sharp" size={24} color="black" /> 
							: <Ionicons name="ios-chevron-up-sharp" size={24} color="black" />}
					</Text>
				</Pressable>

				{expanded && (
					<View style={{flexDirection: 'row'}}>
						<View style={{width: '70%'}}>
							<Text style={{fontSize: 17}}>
							Estimated time:&nbsp;
								{routeDuration?.hours == 0 ? null : routeDuration?.hours + ` h`}
								{(routeDuration?.minutes == 0) ? null : routeDuration?.minutes + ` m`} {routeDuration?.seconds + ` s`}
							</Text>
							<Text style={{fontSize: 17}}>Distance: {routeDistance} km </Text>
						</View>
						<View style={{width: '30%'}}>
							<FontAwesome5 name="hiking" size={40} color="black" />
						</View>
					</View>
				)}

			</View>

		</View>
	);
};

export default MapboxView;