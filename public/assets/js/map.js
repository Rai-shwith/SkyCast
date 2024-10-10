import { handleMapUI } from "./uiManager.js";
import { API_KEY } from "./location.js";
// Initialize the map and set its view to a chosen location and zoom level
const map = L.map('map',{
    scrollWheelZoom: false, // Disable scroll zoom by default
}).setView([12.9716, 77.5946], 13);  // Set to Bangalore by default
// const map = L.map('map');

// Attach wheel event listener to map container
const mapContainer = map.getContainer();

mapContainer.addEventListener('wheel', (event) => {
    if (event.shiftKey || event.ctrlKey) {
        event.preventDefault(); // Prevent the default scroll behavior
        if (event.deltaY < 0) {
            map.zoomIn(); // Zoom in if scrolling up
        } else {
            map.zoomOut(); // Zoom out if scrolling down
        }
    }
});


// Load and display a tile layer on the map (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,{})
    // .addTo(map);

// Add a marker at a specific location
// L.marker([12.9716, 77.5946]).addTo(map);

let marker;
const addMarker = async (lat, lng) => {
    marker = L.marker([lat, lng]).addTo(map);
    // Show a popup with lat and long
    // marker.bindPopup("You clicked the map at: <br> Latitude: " + lat + "<br> Longitude: " + lng).openPopup();
}

const onMapClick = async (e) => {
    if (marker) {
        map.removeLayer(marker);
    }
    // Get latitude and longitude from click event
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    addMarker(lat, lng);

    handleMapUI(lat,lng);
}

const flyToLocation = async (lat, lng, zoomLevel = 10) => {
    console.log(lat,lng)
    if (marker) {
        map.removeLayer(marker);
    }
    if (!isNaN(lat) && !isNaN(lng)) {
        map.flyTo([lat, lng], zoomLevel, {
            animate: true,
            duration: 2  // Duration of the flight in seconds
        });
    } else {
        console.error("Invalid LatLng: ", lat, lng);
    }
    await addMarker(lat,lng);
}
// setTimeout(() => {
//     flyToLocation(14.275,18.307,3)
    
// }, 3000);
map.on('click', onMapClick);

export {flyToLocation }
