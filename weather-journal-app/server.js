// Setup empty JS object to act as endpoint for all routes
const projectData = { entries: [] };

// Require Express to run server and routes
const express = require('express');

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
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => { console.log(`Listening at port: ${port}`) });

// Route to return all journal entries (projectData object)
app.get('/all', (req, res) => res.send(projectData.entries.reverse()));

// Route to add a journal entry into projectData
app.post('/addEntry', (req, res) => {
    projectData.entries.push(req.body);
    res.send(projectData.entries);
});
