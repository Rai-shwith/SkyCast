import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

// API key endpoint
app.get('/apikey', (req, res) => {
  res.json({ API_KEY });
});

// Middleware for JSON requests
app.use(express.json());

// Trust proxy for correct IP extraction
app.set('trust proxy', true);

// Get location based on client's IP
app.get('/api/get-location', async (req, res) => {
  console.log('Entering the get-location endpoint');
  try {
    // Extract IP from the request headers or fallback to req.ip
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.ip;
    console.log('Client IP:', ip);

    // Call IP API to get location information
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);

    // Check if the response contains valid data
    if (response.data.error) {
      console.error('IP API returned an error:', response.data.error);
      return res.status(500).json({ error: 'Error fetching location data' });
    }

    // Send the location data as JSON to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/get-location:', error.message);

    // Ensure the error is sent as JSON so the frontend can handle it
    res.status(500).json({ error: 'Error fetching data from IP API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
