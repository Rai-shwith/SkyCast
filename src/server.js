import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

app.get('/apikey',(req,res) => {
    res.json({API_KEY});
})
app.use(express.json());

app.get('/api/get-location', async (req, res) => {
    console.log('entering get location')
    try {
      const ip = req.ip; // or req.headers['x-forwarded-for'] for proxied requests
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  });

app.listen(port, () => {
    console.log('server is running on ' + port);
});