// const fs = require("fs");
const API_KEY = "c998dd4dbd2f4a70556c0817172bc951";

// Function to get the current weather
const getCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  // console.log(data);
  return data
};

// Function to get the latitude and longitude of a city
const directGeocoding = async (city) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  return { lat: data[0].lat, lon: data[0].lon };
};

// Function to get the city from latitude and longitude
const reverseGeocoding = async (lat, lon) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  return { name: data[0].name, state: data[0].state, country: data[0].country };
}

// Function to get the location of the user using the IP address
const getIPLocation = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  console.log(data.city);

  return { lat: data.latitude, lon: data.longitude };
};

// Function to get the location of the user using their GPS coordinates
const getGPSLocation = async () => {
  // Example implementation
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

// Function to get the weater forcast for the next 5 days
const getFiveDayForcast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  const forecasts = data.list;
  // fs.writeFile("exampleFullFiveDay.json", JSON.stringify(forecasts), (error) => {
  //   if (error) {
  //     console.log(error);
  //   }
  // });
  return forecasts
}

// This function filters 5 days 3 hourly forcasts array  to 5 days daily forcast array
const filterFiveDayForecast = (fiveDayForecast) =>{
  const nextFiveDayForecast = [];
  const day = new Date();
  day.setDate(day.getDate() + 1);
  let forcast_day;
  for (const forecast of forecasts) {
    forcast_day = new Date(forecast.dt_txt);
    if (forcast_day.getDate() == day.getDate()) {
      nextFiveDayForecast.push(forecast);
      day.setDate(day.getDate() + 1);
    }
  }
  return nextFiveDayForecast;
}

// // Used to search weather from the search bar
// const handleSearch = async () => {
//   let searchItem = search.querySelector('input').value;
//   console.log("searching for "+ searchItem+" weather...");
//   //TODO: implement the search function
//   ({lat, lon} = await directGeocoding(searchItem));
//   const currentWeather = await getCurrentWeather(lat, lon);
// }
// const search = document.querySelector('section.search')
// // Event listeners for the search bar
// search.querySelector('input').addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     handleSearch();
//   }
// });
// Event listener for the search icon
// search.querySelector('.search-icon').addEventListener('click', () => {
//   handleSearch();
// }); 

// //function to fetch the geolocation coordinates when the browser loads the document
// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     const { lat, lon } = await getGPSLocation();
//     const address = await reverseGeocoding(lat, lon);
//   } catch (error) {
//     console.error('Error getting GPS location:', error);
//   }
// });
