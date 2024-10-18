// Setup empty JS object to act as endpoint for all routes
const projectData = {
    trips: [
        {
            tripName: 'Japan',
            startDate: '2024-12-20',
            endDate: '2025-01-05',
            tripId: 0
        },
        {
            tripName: 'France',
            startDate: '2022-11-01',
            endDate: '2022-11-30',
            tripId: 1
        }
    ]
};

// Import libraries
import express, { urlencoded, json, static as expressStatic } from 'express';
import fetch from 'node-fetch';

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//const bodyParser = require('body-parser');
app.use(urlencoded({ extended: false }));
app.use(json());

// Cors for cross origin allowance
import cors from 'cors';
app.use(cors());

// Initialize the main project folder
app.use(expressStatic('client'));

// Create new trip
app.post('/addnewtrip', (req, res) => {
    try {
        const tripData = req.body;
        // generate trip id for new trips, use consequent numbers
        if (projectData.trips.length > 0) {
            tripData.tripId =
                Math.max(...projectData.trips.map((trip) => trip.tripId)) + 1;
        } else {
            tripData.tripId = 0;
        }
        projectData.trips.push(tripData);
        res.status(200).json({ message: 'Trip created successfully.' });
        // temp -
        console.log('data receieved: ', tripData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create a trip.' });
    }
});

// Get list of existing trips (basic info only)
app.get('/loadtrips', (req, res) => {
    try {
        res.send(
            projectData.trips.map((trip) => {
                return {
                    tripName: trip.tripName,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    tripId: trip.tripId
                };
            })
        );
    } catch (error) {
        res.status(500).json({ message: 'Failed to list existing trips.' });
    }
});

// Get all details for a given trip id
app.get('/trip/:tripId', (req, res) => {
    try {
        res.send(
            projectData.trips.filter((trip) => trip.tripId == req.params.tripId)[0]
        );
    } catch (error) {
        res.status(500).json({ message: 'Failed to get trip information.' });
    }
});

// Get place name suggestions while the user types
app.get('/places-search/:startsWith', async (req, res) => {
    try {
        const response = await fetch(
            'http://api.geonames.org/postalCodeSearchJSON?username=iwakodarya&placename_startsWith=' +
                req.params.startsWith
        );
        const placesList = await response.json();
        res.send(placesList);
    } catch (error) {
        res.status(500).json({
            message: 'Server failed to get place search suggestions: ' + error
        });
    }
});

// Setup Server
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
