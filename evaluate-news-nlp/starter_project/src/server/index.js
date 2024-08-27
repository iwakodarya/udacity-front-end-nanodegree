var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname);

// Variables for url and api key
var application_key = process.env.API_KEY;


app.get('/', function (req, res) {
    res.send('dist/index.html');
});


// POST Route
app.post('/api', function (req, res) {
    res.send('URL received for processing')
    // TODO: Make API request using req.body 
    // TODO: Send back a response with sentiment analysis
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


