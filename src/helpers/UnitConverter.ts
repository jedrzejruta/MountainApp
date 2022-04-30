export type ITime = {
	hours?: number,
	minutes?: number,
	seconds: number
}

export const secondsToTime = (timeInSeconds: number) : ITime => {
	const sec = Math.round(timeInSeconds);

	const hours = Math.floor(sec / (60 * 60));
	const minutes = Math.floor(sec % (60 * 60)/60);
	const seconds = Math.ceil(sec % (60 * 60) % 60);

	const time: ITime = {
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};

	return time;
};

export const metresToReadable = (distanceInMetres: number) : number => {
	distanceInMetres = parseFloat(distanceInMetres.toFixed(2));

	const properDistance = distanceInMetres > 1000 ? parseFloat((distanceInMetres / 1000).toFixed(2)) : distanceInMetres;
	return properDistance;
};