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
        },
    ]
};

// Require Express to run server and routes
const express = require('express');
//const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('client'));

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
        res.send(projectData.trips);
    } catch (error) {
        res.status(500).json({ message: 'Failed to list existing trips.' });
    }
});

// Setup Server
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});
