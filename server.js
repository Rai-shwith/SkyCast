const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));
app.use(express.json());
// Change this to public while deploying
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('server is running on ' + port);
});