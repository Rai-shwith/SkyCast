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
    '/api/direct-geocoding',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city })
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.log("Incorrect Location given")
      throw new Error(data.error);
    }
    return data;
  };

  // Function to get the city from latitude and longitude
const reverseGeocoding = async (lat, lon) => {
  console.log('Entering the Function reverseGeocoding')
  const response = await fetch(
    '/api/reverse-geocoding',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lat, lon })
    });
   if (response.status === 200){
    const data = await response.json();
    return data;
  }else{
    console.log("Error in /api/reverse-geocoding");
    throw new Error("Error in /api/reverse-geocoding");
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