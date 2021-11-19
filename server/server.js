const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 0 - register as GET 
app.get('/hello', routes.hello)

//Route 1 - register as GET
app.get('/map/parks_in_state', routes.parks_in_state)

// Route 2 - register as GET 
app.get('/map/common_animals', routes.common_animals_state)

// Route 3 - register as GET 
app.get('/map/num_trails', routes.num_trails_state)

// Route 4 - register as GET 
app.get('/search/search_species', routes.search_species)

// Route 5 - register as GET 
app.get('/search/species_state', routes.species_state)

// Route 7  - register as GET
app.get('/search/density_park', routes.density_park)

// Route 9  - register as GET
app.get('/search/green_state', routes.green_state)

// Route 11  - register as GET
app.get('/trail/park_activity', routes.park_activity)

// Route 13  - register as GET
app.get('/trail/state_fishing', routes.state_fishing)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;