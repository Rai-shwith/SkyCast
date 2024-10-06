import { getGPSLocation,getIPLocation } from "./location.js";

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
  
const getDayName = (date) => {
    // Array of day names
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Use getDay() to get the day index, and return the corresponding day name
    return days[date.getDay()];
  }

const getCoordinates = async () => {
    let lat, lon;
    // Get the cordinates using GPS location if not fallback to IP location
    try {
      console.log("Trying to access GPS coordinates");
      
      ({ lat, lon } = await getGPSLocation());
    } catch (error) {
      console.log("Unable to get GPS location.");
      console.log("Trying to access IP cordinates")
      ({ lat, lon } = await getIPLocation());
    }
    // If both GPS and IP methods fails to retreive cordinates these will be default coordinates
    if (!lat || !lon){
      // Easter Egg
      lat = 13.031073;
      lon = 77.565435;
    }
    return {lat,lon}
  }

export {timeFormat,getDayName,getCoordinates}