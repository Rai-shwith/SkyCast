import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));


// Middleware for JSON requests
app.use(express.json());

const cache = {}; // cache for storing ip

// Trust proxy for correct IP extraction
app.set('trust proxy', true);


// Get location based on client's IP
app.get('/api/get-location', async (req, res) => {
  console.log('Entering the get-location endpoint');
  try {
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.ip;
    console.log('Client IP:', ip);

    // Check if the IP is cached
    if (cache[ip]) {
      console.log('IP found in cache:', ip);
      return res.json(cache[ip]);
    }

    // Call IP API to get location information
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);

    // Check for error in response (rate limiting or API issues)
    if (response.data.error) {
      console.error('IP API returned an error:', response.data.error);
      return res.status(500).json({ error: 'Error fetching location data' });
    }

    cache[ip] = response.data;
    // check the limit of cache 
    const limit = 1000
    if (Object.keys(cache).length > limit) {
      console.log("Cache has reached it limit ",limit,"\nClearing the cache")
    }

    // Send the location data as JSON to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/get-location:', error.message);

    // Ensure the error is sent as JSON
    if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'Error fetching data from IP API' });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
