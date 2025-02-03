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

const getKey = () => {
  // This is a very bad practice to include Api keys. Please don't use my key's get it for free from openweathermap (mine is also a free one)
  return "ba11989068d58f2f33f0674d075f9b22"
}

// Function to get the latitude and longitude of a city
const directGeocoding = async (city) => {
  console.log('Entering the Function directGeocoding');

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${getKey()}`
  );
  const data = await response.json();
  console.log(data);
  if (data.length > 0) {
    return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, state: data[0].state, country: data[0].country };
  } else {
    console.log("Incorrect Location given")
    throw new Error(data.error);
    // res.json({ error: "Incorrect Location" }).status(404);
  }
  // const response = await fetch(
  // '/api/direct-geocoding',
  // {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ city })
  // });
  // const data = await response.json();
  // console.log(data);
  // if (data.error) {
  //   console.log("Incorrect Location given")
  //   throw new Error(data.error);
  // }
  // return data;
};

// Function to get the city from latitude and longitude
const reverseGeocoding = async (lat, lon) => {
  console.log('Entering the Function reverseGeocoding');


  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${getKey()}`
    );
    const data = await response.json();
    return { name: data[0].name, state: data[0].state, country: data[0].country };
  } catch (error) {
    console.error('Error in /api/reverse-geocoding:', error.message);
    throw new Error("Error in /api/reverse-geocoding");
  }

  // const response = await fetch(
  //   '/api/reverse-geocoding',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ lat, lon })
  //   });
  //  if (response.status === 200){
  //   const data = await response.json();
  //   return data;
  // }else{
  //   console.log("Error in /api/reverse-geocoding");
  //   throw new Error("Error in /api/reverse-geocoding");
  // }
}

// Function to get the location of the user using the IP address
const getIPLocation = async () => {
  console.log('Entering the Function getIPLocation');
  // const response = await fetch("/api/get-location");
  let data;
  try {
    // Call IP API to get location information
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    data = await response.json();
    // Check for error in response (rate limiting or API issues)
    if (data.error) {
      console.error('IP API returned an error:', data.error);
      return res.status(500).json({ error: 'Error fetching location data' });
    }

  } catch (error) {
    console.error('Error in /api/get-location:', error.message);

    // Ensure the error is sent as JSON
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Error fetching data from IP API' });
    }
  }
  return { lat: data.latitude, lon: data.longitude };
};


export { directGeocoding, getGPSLocation, reverseGeocoding, getIPLocation, getKey };