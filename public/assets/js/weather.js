// Function to get the current weather
const getCurrentWeather = async (lat, lon) => {
	console.log('Entering the Function getCurrentWeather')
	const response = await fetch('/api/current-weather', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ lat, lon }),
	}
	);
	const data = await response.json();
	// console.log(data);
	return data
};

// This function filters 5 days 3 hourly forecasts array  to 5 days daily forcast array
const filterFiveDayForecast = async (fiveDayForecast) => {
	console.log('Entering the Function filterFiveDayForecast')
	// TODO: use sunrise and sunset in this
	fiveDayForecast = await fiveDayForecast; // to resolve the promise
	const { sunrise, sunset } = fiveDayForecast.city;
	const timezone = fiveDayForecast.city.timezone;
	const forecasts = fiveDayForecast.list;
	const nextFiveDayForecast = [];
	const todayTimelyForecast = [];
	const day = new Date();
	day.setHours(0, 0, 0, 0);
	day.setDate(day.getDate() + 1);
	let forcast_day;
	for (const forecast of forecasts) {
		forecast.sys.sunrise = sunrise;
		forecast.sys.sunset = sunset;
		forecast.timezone = timezone;
		forcast_day = new Date(forecast.dt_txt);
		if (forcast_day.getDate() == day.getDate()) {
			forecast.next = [forecast];
			nextFiveDayForecast.push(forecast);
			day.setDate(day.getDate() + 1);
		} else if (nextFiveDayForecast.length > 0) {
			const timilyForecasts = nextFiveDayForecast[nextFiveDayForecast.length - 1].next;
			if (!timilyForecasts) {
				nextFiveDayForecast[nextFiveDayForecast.length - 1].next = [forecast];
			} else {
				timilyForecasts.push(forecast);
			}
		} else {
			todayTimelyForecast.push(forecast)
		}
	}
	return { nextFiveDayForecast, todayTimelyForecast };
}

// Function to get the weater forcast for the next 5 days
const getFiveDayForcast = async (lat, lon) => {
	console.log('Entering the Function getFiveDayForcast')
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	);
	const data = await response.json();
	const forecasts = data;
	// fs.writeFile("exampleFullFiveDay.json", JSON.stringify(forecasts), (error) => {
	//   if (error) {
	//     console.log(error);
	//   }
	// });
	return forecasts
}


export { getCurrentWeather, filterFiveDayForecast, getFiveDayForcast }
