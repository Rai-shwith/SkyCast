// const fs = require("fs");
import {directGeocoding,getGPSLocation,reverseGeocoding,getIPLocation,API_KEY} from "./location.js";

// sunrise and sunset will be same for all the days in the 5 day forecast so we can declare them as global variables
let sunrise; 
let sunset;

// Function to get the current weather
const getCurrentWeather = async (lat, lon) => {
  console.log('Entering the Function getCurrentWeather')
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  // console.log(data);
  return data
};

// This function filters 5 days 3 hourly forcasts array  to 5 days daily forcast array
const filterFiveDayForecast = (fiveDayForecast) => {
  console.log('Entering the Function filterFiveDayForecast')
  // TODO: use sunrise and sunset in this
  const { sunrise, sunset } = fiveDayForecast;
  const forcasts = fiveDayForecast.list;
  const nextFiveDayForecast = [];
  const day = new Date();
  day.setHours(0,0,0,0);
  day.setDate(day.getDate() + 1);
  let forcast_day;
  for (const forecast of forcasts) {
    forcast_day = new Date(forecast.dt_txt);
    if (forcast_day.getDate() == day.getDate()) {
      nextFiveDayForecast.push(forecast);
      day.setDate(day.getDate() + 1);
    } else if (nextFiveDayForecast.length > 0) {
      const timilyForcasts = nextFiveDayForecast[nextFiveDayForecast.length - 1].next;
      if (!timilyForcasts) {
        nextFiveDayForecast[nextFiveDayForecast.length - 1].next = [forecast];
      } else {
        timilyForcasts.push(forecast);
      }
    }
  }
  return nextFiveDayForecast;
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


const timeFormat = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Convert to 12-hour format and determine AM/PM
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'

  minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes

  return hours + ':' + minutes + ' ' + ampm;
}

function getDayName(date) {
  // Array of day names
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Use getDay() to get the day index, and return the corresponding day name
  return days[date.getDay()];
}


const handleMainWeatherBoxUI = async (weatherData, locationData) => {
  console.log('Entering the Function handleMainWeatherBoxUI');
  console.log(weatherData);
  const iconCode = String(weatherData.weather[0].icon).slice(0, 2);
  const weatherType = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const windSpeed = weatherData.wind.speed;
  const timezone = weatherData.timezone; 
  const myTimezone = 19800;
  let precipitation;
  try {
    precipitation = weatherData.rain['1h']
  } catch (error) {
    console.log(error);
    precipitation = 0;
  }
  const date = new Date((weatherData.dt - myTimezone + timezone)*1000);
  const city = locationData.name;
  const state = locationData.state;
  const countryCode = locationData.country;
  sunrise = new Date((weatherData.sys.sunrise - myTimezone + timezone)*1000);
  sunset = new Date((weatherData.sys.sunset - myTimezone + timezone)*1000);

  const imgLocation = 'assets/images/'

  const mainWeatherBox = document.querySelector('.main-weather-box'); // Get the main weather box
  mainWeatherBox.querySelector('.icon').setAttribute('src', imgLocation + iconCode + '.png') // Set the weather icon
  mainWeatherBox.querySelector('.weather-type').textContent = weatherType; // Set the weather type  
  mainWeatherBox.querySelector('.temp').textContent = temperature + ' °C'; // Set the temperature
  mainWeatherBox.querySelector('.humid').textContent = humidity + ' %'; // Set the humidity
  mainWeatherBox.querySelector('.pressure').textContent = pressure + ' hPa'; // Set the pressure
  mainWeatherBox.querySelector('.wind-speed').textContent = windSpeed + ' m/s'; // Set the wind speed
  mainWeatherBox.querySelector('.preci').textContent = precipitation + ' mm/h'; // Set the precipitation
  mainWeatherBox.querySelector('.day').textContent = getDayName(date) // set the day
  mainWeatherBox.querySelector('.time').textContent = timeFormat(date) // set the time
  mainWeatherBox.querySelector('.city').textContent = city; // set the city
  mainWeatherBox.querySelector('.state').textContent = state; // set the state
  mainWeatherBox.querySelector('.code').textContent = countryCode; // set the country code
  mainWeatherBox.querySelector('.sunrise').textContent = timeFormat(sunrise); // set the sunrise time
  mainWeatherBox.querySelector('.sunset').textContent = timeFormat(sunset); // set the sunset time
}


// Handle the search
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search input');
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
searchIcon.addEventListener('click', () => {
  handleSearch();
});

const handleSearch = async () => {
  const searchValue = searchInput.value.trim();
  if (searchValue){
  console.log('searching the weather of '+searchValue);
  const { lat, lon, name, state, country} = await directGeocoding(searchValue); // Get the cordinates using city name 
  const weatherData = await getCurrentWeather(lat, lon);
  handleMainWeatherBoxUI(weatherData, { name, state, country });
}}


const getCoordinates = async () => {
  let lat, lon;
  // Get the cordinates using GPS location if not fallback to IP location
  try {
    ({ lat, lon } = await getGPSLocation());
  } catch (error) {
    console.log(error);
    ({ lat, lon } = await getIPLocation());
  }
  return {lat,lon}
}

const main = async () => {
  const {lat, lon} = await getCoordinates();
  const weatherData = await getCurrentWeather(lat, lon);
  const locationData = await reverseGeocoding(lat, lon);
  handleMainWeatherBoxUI(weatherData, locationData);
}
main()

// async function test() {
//   const lat = 12.7633
//   const lon = 75.2018
//   const fiveDayForecast = await getFiveDayForcast(lat, lon);
//   fs.writeFileSync("EXAMPLES/FD.json", JSON.stringify(fiveDayForecast, null, 4));
//   fs.writeFileSync("EXAMPLES/FFD.json", JSON.stringify(filterFiveDayForecast(fiveDayForecast, null, 4)));
// }

// // test()

