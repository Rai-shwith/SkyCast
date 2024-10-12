// Function to get the location of the user using their GPS coordinates
const getGPSLocation = async () => {
    console.log('Entering the Function getGPSLocation');
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

// Function to get the latitude and longitude of a city
const directGeocoding = async (city) => {
  console.log('Entering the Function directGeocoding');
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    if (data.length >0){
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, state: data[0].state, country: data[0].country };
}else{
  console.log("Incorrect Location given")
  throw new Error("Incorrect Location");
}
  };

  // Function to get the city from latitude and longitude
const reverseGeocoding = async (lat, lon) => {
  console.log('Entering the Function reverseGeocoding')
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    return { name: data[0].name, state: data[0].state, country: data[0].country };
  } catch (error) {
    throw error;
  }
  }

  // Function to get the location of the user using the IP address
const getIPLocation = async () => {
  console.log('Entering the Function getIPLocation');
    const response = await fetch("/api/get-location");
    const data = await response.json();
    return { lat: data.latitude, lon: data.longitude };
  };


export {directGeocoding,getGPSLocation,reverseGeocoding,getIPLocation};