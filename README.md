
# **SkyCast**

### **Project Overview:**
**SkyCast** is a Node.js-powered weather app that provides users with real-time weather information and a 5-day forecast. By utilizing GPS location, or falling back to IP geolocation, SkyCast ensures users are always updated with relevant weather data. Users can also manually search for weather info by entering a specific location.

---

### **Features:**
- **Automatic Weather Detection:** Fetches weather info using GPS. If GPS isn't available, the app falls back to the user's IP to determine the location.
- **Location Search:** Users can search for any city or place worldwide to get real-time weather and forecasts.
- **Weather Forecast:** Provides current weather along with a detailed 5-day forecast.
- **User-Friendly Interface:** A clean, modern UI that's easy to navigate and understand.
  
---

### **API Used:**
This project integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to get weather data, forecasts, and other meteorological details.

---

### **Installation Instructions:**
To get started with SkyCast, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Rai-shwith/SkyCast.git
    ```

2. **Install Node Dependencies:**
    Make sure Node.js and npm are installed, then install the required packages:
    ```bash
    npm install
    ```

3. **Set Up API Key:**
    - Create a `.env` file in the root directory.
    - Get your API key from [OpenWeatherMap](https://openweathermap.org/api).
    - Add the following to the `.env` file:
      ```
      API_KEY=your_openweathermap_api_key
      ```

4. **Run the Application:**
    Start the server with:
    ```bash
    npm start
    ```

---

### **Usage:**

1. **Automatic Weather Fetching:**
   - On launch, the app will attempt to get your location via GPS or IP. The current weather and 5-day forecast for that location will be displayed.

2. **Search for Specific Locations:**
   - Use the search bar to input the name of any city or location, and the app will fetch the weather info and forecast for that location.

3. **Forecast Details:**
   - The app displays important weather details such as temperature, wind speed, humidity, and a general weather description.

---

### **Tech Stack:**
- **Backend:** Node.js with Express
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **API:** OpenWeatherMap API for weather data
- **Location Services:** Browser's Geolocation API and IP geolocation

---

### **Scripts:**

- `npm start`: Starts the Node.js server.
- `npm run dev`: Starts the server in development mode (use nodemon to watch for changes).

---

### **Contributors:**
This project is built and maintained by:

- **[Ashwith Rai](https://github.com/Rai-shwith)** – Lead Developer
- **[Hiba Zaynab](https://github.com/HibaZaynab)** – Co-Developer and Designer

---

### **Future Enhancements:**
- Add more detailed hourly forecasts.
- Implement weather animations to show sunny, cloudy, rainy conditions.
- Add push notifications for weather alerts (e.g., severe storms).

---

### **License:**
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for more details.

---
