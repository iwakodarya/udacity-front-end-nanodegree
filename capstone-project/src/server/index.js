// Setup empty JS object to act as endpoint for all routes
const projectData = {
    trips: [
        {
            tripName: 'Japan',
            startDate: '2024-12-20',
            endDate: '2025-01-05',
            tripId: 0,
            destinations: []
        },
        {
            tripName: 'France',
            startDate: '2022-11-01',
            endDate: '2022-11-30',
            tripId: 1,
            destinations: []
        }
    ]
};

// Import libraries
import express, { urlencoded, json, static as expressStatic } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

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

// Set up .env config
dotenv.config();
const GEONAMES_API_USERNAME = process.env.GEO_NAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

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
        tripData.destinations = [];
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
            projectData.trips.filter(
                (trip) => trip.tripId == req.params.tripId
            )[0]
        );
    } catch (error) {
        res.status(500).json({ message: 'Failed to get trip information.' });
    }
});

// Get place name suggestions while the user types
app.get('/places-search/:startsWith', async (req, res) => {
    try {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?` +
                `username=${GEONAMES_API_USERNAME}` +
                `&featureclass=P` +
                `&cities=cities15000` +
                `&maxRows=10` +
                `&name_startsWith=` +
                req.params.startsWith
        );
        const responseJson = await response.json();
        const placesList = responseJson.geonames;
        // Sort by population
        placesList.sort((cityA, cityB) => cityB.population - cityA.population);
        // Add user facing name
        placesList.forEach(
            (place) =>
                (place.displayName = `${place.name}, ${place.countryName}`)
        );
        res.send(placesList);
    } catch (error) {
        res.status(500).json({
            message: 'Server failed to get place search suggestions: ' + error
        });
    }
});

// Add destination to trip
app.post('/add-destination-to-trip/:tripId', async (req, res) => {
    try {
        // get weather forecast for location
        const response = await fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?` +
                `key=${WEATHERBIT_API_KEY}` +
                `&lat=${req.body.lat}` +
                `&lon=${req.body.lng}`
        );
        const responseJson = await response.json();
        const weatherForecast = responseJson.data.map((forecast) => {
            return { date: forecast.valid_date, temp: forecast.temp };
        });
        const destInfo = req.body;
        destInfo.weatherForecast = weatherForecast;

        const activeTrip = projectData.trips.find(
            (trip) => (trip.tripId = req.params.tripId)
        );
        activeTrip.destinations.push(destInfo);

        console.log(`Destination info added:`, destInfo);
        res.status(200).json({ message: 'Destination added successfully.' });
    } catch (error) {
        res.status(500).json({
            message: 'Server failed to add destination to trip: ' + error
        });
    }
});

// Setup Server
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
