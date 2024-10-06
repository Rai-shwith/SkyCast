# **SkyCast** ☁️🌦️  
*Your Personal Weather Companion*

---

### **Project Overview:**

**SkyCast** is a Node.js-powered weather app that provides users with real-time weather information and a 5-day forecast. By utilizing GPS location or falling back to IP geolocation, SkyCast ensures users are always updated with relevant weather data. Users can also manually search for weather info by entering a specific location.

---

### **Why Use SkyCast?**  
Tired of cluttered weather apps? SkyCast gives you what you need—real-time weather updates, a clean UI, and accurate forecasts, all in one simple package. Stay ahead of the weather, no matter where you are.

---

### **Features:**
- **Automatic Weather Detection:** Fetches real-time weather information using GPS (if available). If GPS isn't accessible, it intelligently falls back to the user's IP address to determine the location and provide weather data.
- **Location Search:** Users can search for any city or place worldwide to get real-time weather and forecasts.
- **Weather Forecast:** Provides current weather along with a detailed 5-day forecast.
- **User-Friendly Interface:** A clean, modern UI that's easy to navigate and understand.

---

### **Screenshots:**

---

### **API Used:**
This project integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to get weather data, forecasts, and other meteorological details.

---

### **Tech Stack:**

- **Backend:** ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) with Express
- **Frontend:** ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white), HTML, JavaScript
- **API:** ![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-orange?logo=openweathermap)
- **Location Services:** Browser's Geolocation API and IP geolocation

---

### **Installation Instructions:**

To get started with SkyCast, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Rai-shwith/SkyCast.git
    ```

2. **Navigate to the SkyCast Directory:**
    ```bash
    cd SkyCast
    ```

3. **Install Node Dependencies:**
    Ensure you have Node.js (v14 or higher) and npm installed. SkyCast utilizes Tailwind CSS for styling and other necessary libraries.
    ```bash
    npm install
    ```

4. **Set Up API Key:**

   - Create a `.env` file in the root directory of the project.
   - Obtain your API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).
   - In the `.env` file, add your API key as shown below:
     ```bash
     API_KEY=your_openweathermap_api_key
     ```
   - Optionally, you can specify a custom port for the application. If no port is provided, the default port (`3000`) will be used:
     ```bash
     PORT=your_preferred_port_number # Optional, default is 3000
     ```

5. **Run the Application:**
    Start the server with:
    ```bash
    npm start
    ```
    Then open your browser and go to `http://localhost:3000` to use SkyCast.

---

### **Usage:**

1. **Automatic Weather Fetching:**
   - On launch, the app will attempt to get your location via GPS or IP. The current weather and 5-day forecast for that location will be displayed.

2. **Search for Specific Locations:**
   - Use the search bar to input the name of any city or location, and the app will fetch the weather info and forecast for that location.

3. **Forecast Details:**
   - The app displays important weather details such as temperature, wind speed, humidity, and a general weather description.

---

### **Scripts:**

- `npm start`: Starts the Node.js server.
- `npm run build`: Builds CSS file from Tailwind at `./public/assets/css/style.css`.

---

### **Contributors:**

This project is built and maintained by:

- **[Ashwith Rai](https://github.com/Rai-shwith)** – Lead Developer (Backend and API integration)
- **[Hiba Zaynab](https://github.com/HibaZaynab)** – Co-Developer and UI Designer

---

### **Future Enhancements:**

- **Hourly Forecasts:** Display weather forecasts broken down by the hour to give users more detailed information.
- **Weather Animations:** Bring the app to life with animated visuals, showing sun, rain, clouds, and other weather conditions in real-time.
- **Map Visuals:** Add an interactive map feature to display weather patterns visually.

---

### **License:**

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
