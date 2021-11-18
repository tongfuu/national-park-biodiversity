const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

//Route 2 - register as GET
app.get('/map/parks_in_state', routes.parks_in_state)


// Route 4 - register as GET 
app.get('/map/num_trails', routes.num_trails_state)



app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;