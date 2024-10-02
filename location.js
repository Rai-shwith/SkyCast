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

// Function to get the latitude and longitude of a city
const directGeocoding = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return { lat: data[0].lat, lon: data[0].lon };
  };

  // Function to get the city from latitude and longitude
const reverseGeocoding = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
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

  //function to fetch the geolocation coordinates when the browser loads the document
// document.addEventListener('DOMContentLoaded', async () => {
//   try {
//     //   const { lat, lon } = await getGPSLocation();
//     const { lat, lon } = await getIPLocation();
//     const address = await reverseGeocoding(lat, lon);
//     console.log(address);
//     document.body.innerHTML=address.name;
//   } catch (error) {
//     console.error('Error getting GPS location:', error);
//   }
// });