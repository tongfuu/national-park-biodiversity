const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// Route 0 (handler)
async function hello(req, res) {
    // a GET request to /hello
    res.send(JSON.parse('{"text":"Hello! Welcome to National Park Biodiversity Project!"}'))
}

// Route 1 (handler) List all parks of a selected state on the map
async function parks_in_state(req, res) {
    
    const state = req.query.state
    var query = `SELECT park_name FROM Park WHERE state = '${state}'`;

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}

// Route 2 (handler)
async function common_animals_state(req, res) {

    const state = req.query.state
    var query = `SELECT common_names
    FROM Species s JOIN Park p ON s.park_name = p.park_name
    WHERE p.state = '${state}'
    LIMIT 3
    `;


    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}

// Route 3 (handler)
async function num_trails_state(req, res) {

    console.log('hello')
    const state = req.query.state
    var query = `SELECT state_name, count(*) AS numTrails
    FROM Trails
    WHERE state_name = '${state}'
    `;


    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}

// Route 4 (handler)
async function search_species(req, res) {
    const park = req.query.park
    const category = req.query.category ? req.query.category : null
    if (category) {
        console.log('hellooooo')
        connection.query(`SELECT DISTINCT scientific_name
        FROM Species
        WHERE category = '${category}' AND park_name = '${park}'`, 
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results.length > 0) {
                // console.log(results)
                res.json({ results: results })
            } else {
                res.json({ results: []})
            }
        })
    } else {
        connection.query(`SELECT DISTINCT scientific_name
        FROM Species
        WHERE park_name = '${park}'`, 
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results.length > 0) {
                // console.log(results)
                res.json({ results: results })
            } else {
                res.json({ results: []})
            }
        })
    }

}

// Route 5 (handler)
async function species_state(req, res) {

    const state = req.query.state
    var query = `SELECT distinct scientific_name
    FROM Species s join Park p on s.park_name = p.park_name
    WHERE p.state = '${state}'
    `;


    connection.query(query, function (error, results, fields) {
        if (error) {
            // console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            // console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}


module.exports = {
    hello,
    num_trails_state,
    parks_in_state,
    common_animals_state,
    search_species,
    species_state
}