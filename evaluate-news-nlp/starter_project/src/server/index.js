var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname);

// Variables for url and api key
const application_key = process.env.API_KEY; 
const base_api_url = 'https://api.meaningcloud.com/sentiment-2.1?lang=auto&key=' + application_key;

app.get('/', function (req, res) {
    res.send('dist/index.html');
});

// POST Route
app.post('/api', async function (req, res) {
    try {
        const url = req.body.URL;
        const response = await axios.get(`${base_api_url}&url=${url}`);
        const result = {
            'polarity': response.data.score_tag,
            'subjectivity': response.data.subjectivity,
            'irony': response.data.irony
        }
        res.send(result);
    }
    catch(error) {
        console.log("Error getting data from api::", error)
    }
    // TODO: Make API request using req.body 
    // TODO: Send back a response with sentiment analysis
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


