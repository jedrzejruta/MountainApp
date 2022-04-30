export interface OsmResponse {
	place_id: number;
	licence: string;
	osm_type: OsmType;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	icon?: string;
	address: Address;
}

export interface Address {
	natural?: string;
	city?: string;
	county?: string;
	country: string;
	country_code: string;
	municipality?: string;
	state?: string;
	'ISO3166-2-lvl4'?: string;
	hamlet?: string;
	suburb?: string;
	village?: string;
	postcode?: string;
	road?: string;
	quarter?: string;
	city_district?: string;
	neighbourhood?: string;
	tourism?: string;
	house_number?: string;
	town?: string;
	district?: string;
}

export enum OsmType {
	Node = 'node',
	Way = 'way',
}

export interface ElevationAPI {
    results: Result[];
}

export interface Result {
    latitude:  number;
    longitude: number;
    elevation: number;
}

async function httpRequest<TResponse>(
	url: string,
	config: RequestInit = {}
): Promise<TResponse> {
	const response = await fetch(url, config);
	return await response.json();
}

export class GeoCodingOSM {
	private readonly apiURI = 'https://nominatim.openstreetmap.org/search.php?format=json&addressdetails=1&limit=20';
	private readonly requestOptions = {
		method: 'GET'
	}

	public async getGeoPositon(lat: number, lng: number): Promise<OsmResponse[]> {
		const response: OsmResponse[] = await httpRequest(`${this.apiURI}&q=${lat},${lng}`, this.requestOptions);
		return response;
	}

	public async getGeoAddress(place: string): Promise<OsmResponse[]> {
		const response: OsmResponse[] = await httpRequest(`${this.apiURI}&q=${place}`, this.requestOptions);
		return response;
	}
}

export class ElevationAPI {
	private readonly apiURI = 'https://api.open-elevation.com/api/v1/lookup';
	private readonly requestOptions = {
		method: 'GET'
	}

	public async getElevationFromPoint(lat: number, lng: number): Promise<ElevationAPI> {
		const response: ElevationAPI = await httpRequest(`${this.apiURI}?locations=${lat},${lng}`, this.requestOptions);
		return response;
	}
}