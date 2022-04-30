import { DirectionsRequest } from '@mapbox/mapbox-sdk/services/directions';

const startPoint = [19.92169116916679, 50.04589934205853];
const endPoint = [19.93536659544438, 50.05162830483485];

export const request: DirectionsRequest = {
	profile: 'walking',
	geometries: 'geojson',
	waypoints: [
		{coordinates: startPoint},
		{coordinates: endPoint}
	],
	language: 'pl',
	steps: true,
	bannerInstructions: true,
	
};