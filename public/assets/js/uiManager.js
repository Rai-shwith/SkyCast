import { timeFormat, getDayName, getCoordinates } from "./utils.js"
import { directGeocoding, reverseGeocoding } from "./location.js";
import { getCurrentWeather, filterFiveDayForecast, getFiveDayForcast } from "./weather.js"
const myTimezone = (new Date()).getTimezoneOffset() * 60; // Timezone offset .India -> -19800

const handleMainWeatherBoxUI = async (weatherData, locationData) => {
    console.log('Updating the main-weather-box UI');
    console.log(weatherData);
    const iconCode = String(weatherData.weather[0].icon).slice(0, 2);
    const weatherType = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    const timezone = weatherData.timezone;
    let precipitation;
    try {
        precipitation = weatherData.rain['1h']
    } catch (error) {
        console.log(error);
        precipitation = 0;
    }
    const date = new Date((weatherData.dt + myTimezone + timezone) * 1000);
    const city = locationData.name;
    const state = locationData.state;
    const countryCode = locationData.country;
    const sunrise = new Date((weatherData.sys.sunrise + myTimezone + timezone) * 1000);
    const sunset = new Date((weatherData.sys.sunset + myTimezone + timezone) * 1000);

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
    searchInput.value = '';
}

const handleTimelyWeatherBoxUI = async (timelyForecastData) => {
    const timezone = timelyForecastData[0].timezone;
    let date;
    let iconCode;
    const timelyWeatherUI = document.querySelector('.timely-weather-slides');
    const leftUI = timelyWeatherUI.querySelector('.left');
    const rightUI = timelyWeatherUI.querySelector('.right');
    leftUI.innerHTML = "";
    rightUI.innerHTML = "";
    timelyForecastData.forEach((forecast, index) => {
        date = new Date((forecast.dt + myTimezone + timezone) * 1000);
        iconCode = String(forecast.weather[0].icon).slice(0, 2);
        let card = document.createElement('div');
        card.classList.add("weather-card", "flex", "justify-between", "items-center", "mx-5", "py-2");
        card.innerHTML = `
                    <div class="flex flex-col items-start text-sm md:text-lg">
                        <div class="">${timeFormat(date)}</div>
                        <div class="">${getDayName(date)}</div>
                    </div>
                    <div class="visuals">
                        <img class="visual h-[3rem] md:h-[5rem]" src="assets/images/${iconCode}.png">
                    </div>
        `
        if (index % 2) {
            rightUI.appendChild(card);
        } else {
            leftUI.appendChild(card);
        }
    });
}

const handleDailyWeatherBoxUI = async (nextFiveDayForecast, locationData) => {
    const dailyWeatherUI = document.querySelector('.daily-weather-slides');
    dailyWeatherUI.innerHTML = "";
    for (const weatherData of nextFiveDayForecast) {
        let iconCode = String(weatherData.weather[0].icon).slice(0, 2);
        let weatherType = weatherData.weather[0].description;
        let temperature = weatherData.main.temp;
        let timezone = weatherData.timezone;
        let date = new Date((weatherData.dt + myTimezone + timezone) * 1000);
        let dayCard = document.createElement('div');
        dayCard.classList.add("day-card", "flex", "bg-[#081A1D]","hover:scale-105", "active:scale-90", "hover:cursor-pointer", "py-5", "px-10", "rounded-xl", "flex-col", "items-center", "m-1", "w-fit", "flex-shrink-0");
        dayCard.innerHTML = `
        <div class="day">${getDayName(date)}</div>
                <img class="visual h-[5rem]" src="assets/images/${iconCode}.png">
                <div class="info flex flex-col items-center">
                    <div>
                        <span class="temp">${temperature} °C</span>
                    </div>
                    <div class="weather-type">${weatherType}</div>
                </div>`
        dayCard.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Adds smooth scrolling
              });
            handleMainWeatherBoxUI(weatherData.next[0], locationData);
            handleTimelyWeatherBoxUI(weatherData.next);
        })
        dailyWeatherUI.appendChild(dayCard);
    }

}

const toggleLoading = ()=> {
    const loadingAnimation = document.querySelector('.pulsing-circle');
    if (loadingAnimation.style.display == 'none') {
        loadingAnimation.style.animationPlayState = 'running'
        loadingAnimation.style.animation = 'pulse 2.5s infinite';
        loadingAnimation.style.display = 'block';
    }else{
        loadingAnimation.style.animationPlayState = 'paused'
        loadingAnimation.style.animation = 'none';
        loadingAnimation.style.display = 'none';
    }
}

// scroll working 
const scrollContainer = document.querySelector('.daily-weather-slides');
scrollContainer.addEventListener('wheel', (event) => {
  event.preventDefault(); // Prevent the default vertical scroll behavior
  scrollContainer.scrollLeft += event.deltaY; // Scroll horizontally instead
});



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
    toggleLoading()
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        console.log('searching the weather of ' + searchValue);
        let result;
        try {
            result = await directGeocoding(searchValue); // Get the cordinates using city name 
        } catch (error) {
            toggleLoading();
            setTimeout(() => {
                alert("Incorrect Location");
            }, 100);
            throw error;
        }
        const { lat, lon, name, state, country } = result;
        await flowController(lat, lon, { name, state, country });
        toggleLoading()
    }
}

// This funtion will run by default to fetch location of current
const main = async () => {
    const { lat, lon } = await getCoordinates();
    const locationData = await reverseGeocoding(lat, lon);
    await flowController(lat, lon, locationData);
    document.querySelector('main').style.display = 'flex';
    toggleLoading()

}
main()

// This funtion will handle the flow of UI updation
const flowController = async (lat, lon, locationData) => {
    const weatherData = await getCurrentWeather(lat, lon);
    const { nextFiveDayForecast, todayTimelyForecast } = await filterFiveDayForecast(getFiveDayForcast(lat, lon));
    handleMainWeatherBoxUI(weatherData, locationData);
    handleTimelyWeatherBoxUI(todayTimelyForecast);
    handleDailyWeatherBoxUI(nextFiveDayForecast, locationData);
}