import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

app.get('/apikey',(req,res) => {
    res.json({API_KEY});
})
app.use(express.json());
app.listen(port, () => {
    console.log('server is running on ' + port);
});