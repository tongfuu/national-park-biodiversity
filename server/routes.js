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

// Route 1 (handler)
async function parks_in_state(req, res) {
    
    const state = req.query.state
    var query = `SELECT COUNT(park_name) AS num FROM Park WHERE state = '${state}'`;

    connection.query(query, function (error, results, fields) {
        if (error) {
            //console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            //console.log(results)
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
            //console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            //console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}

// Route 3 (handler)
async function num_trails_state(req, res) {

    const state = req.query.state
    var query = `SELECT state_name, count(*) AS numTrails
    FROM Trails
    WHERE state_name = '${state}'
    `;


    connection.query(query, function (error, results, fields) {
        if (error) {
            //console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            //console.log(results)
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
                //console.log(error)
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
                //console.log(error)
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

// Route 6 (handler)
async function common_park(req, res) {
    const name = req.query.name
    var query = `SELECT DISTINCT park_name 
    FROM Species
    WHERE common_names LIKE '%${name}%'    
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


// Route 7 (handler)
async function density_park(req, res) {

    const park = req.query.park

    var query = `WITH temp AS (
        SELECT park_name, category, count(species_id) AS speciesNum
        FROM Species 
        WHERE park_name = '${park}'
        GROUP BY category
        )
        SELECT b.category, b.speciesNum/a.Acres AS density
        FROM Park a JOIN temp b ON a.park_name = b.park_name
        ORDER BY density 
        LIMIT 10
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

// Route 8 (handler)
async function scientific_state(req, res) {
    const name = req.query.name
    var query = `SELECT count(scientific_name) as num, state 
    FROM Species s join Park p on s.park_name = p.park_name
    WHERE scientific_name = '${name}'
    GROUP BY state
    ORDER BY count(scientific_name)
    LIMIT 10 
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


// Route 9 (handler)
async function green_state(req, res) {

    const state = req.query.state

    var query = `With total_acres AS (
        SELECT SUM(acres) as acres, state
        FROM Park p
        GROUP BY state
      )
      SELECT t.acres/a.area as percent, a.state
      FROM Area a join total_acres t on a.state = t.state
      WHERE a.state = '${state}';      
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

// Route 10 (handler)
async function park_feature(req, res) {
    const name = req.query.name
    const park = req.query.park
    var query = `SELECT * 
    FROM Features s 
    WHERE s.park_name = '${park}' and s.feature_name = '${name}'
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

// Route 11 (handler)
async function park_activity(req, res) {

    const park = req.query.park
    const activity = req.query.activity

    var query = `SELECT * FROM Activities a 
    WHERE a.park_name = '${park}' and a.activity_name = '${activity}';
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

// Route 12 (handler)
async function state_birding(req, res) {
    const state = req.query.state
    var query = `WITH Bird_Park AS (
        SELECT Park.park_name AS p, Park.state AS t
        FROM Park JOIN Species
        ON Park.park_name = Species.park_name
        WHERE Species.category = 'Bird'
        ),
        Park_Species AS (
          SELECT Park.park_name AS p, Species.scientific_name AS n, Species.conservation_status AS s
          FROM Park JOIN Species
          ON Park.park_name = Species.park_name
          WHERE Species.conservation_status = 'Endangered' OR Species.conservation_status = 'species_of_concern' OR Species.conservation_status = 'Threatened'
          AND Species.category = 'Bird'
        )
        SELECT Bird_Park.p AS park_name, Park_Species.n AS species_name, Park_Species.s AS conservation_status
        FROM Bird_Park
        JOIN Activities ON Bird_Park.p = Activities.park_name
        JOIN Park_Species ON Bird_Park.p = Park_Species.p
        JOIN Trails ON Bird_Park.p = Trails.park_name
        WHERE Activities.activity_name = 'birding' AND Trails.state_name = '${state}'
        LIMIT 500
        `;

    connection.query(query, function (error, results, fields) {
        if (error) {
            //console.log(error)
            res.json({ error: error })
        } else if (results.length > 0) {
            //console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: []})
        }
    });
}


// Route 13 (handler)
async function state_fishing(req, res) {
    
    const state = req.query.state

    var query = `WITH Fish_Park AS (
        SELECT Park.park_name AS p, Park.state AS t
        FROM Park JOIN Species
        ON Park.park_name = Species.park_name
        WHERE Species.category = 'Fish'
        ),
        Park_Species AS (
          SELECT Park.park_name AS p, Species.scientific_name AS n, Species.conservation_status AS s
          FROM Park JOIN Species
          ON Park.park_name = Species.park_name
          WHERE Species.conservation_status = 'Endangered' OR Species.conservation_status = 'species_of_concern' 
          OR Species.conservation_status = 'Threatened'
          AND Species.category = 'Fish'
        )
        SELECT Fish_Park.p AS park_name, Park_Species.n AS species_name, Park_Species.s AS conservation_status
        FROM Fish_Park
        JOIN Activities ON Fish_Park.p = Activities.park_name
        JOIN Park_Species ON Fish_Park.p = Park_Species.p
        JOIN Trails ON Fish_Park.p = Trails.park_name
        WHERE Activities.activity_name = 'fishing' AND Trails.state_name = '${state}'
        LIMIT 500;
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
    species_state,
    density_park,
    green_state,
    park_activity,
    state_fishing,
    common_park,
    scientific_state,
    park_feature,
    state_birding
}