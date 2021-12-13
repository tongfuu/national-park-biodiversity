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
        if (results.length > 0) {
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
    var query = `SELECT common_names AS names
    FROM Species s JOIN Park p ON s.park_name = p.park_name
    WHERE p.state = '${state}'
    LIMIT 3
    `;


    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
    var query = `SELECT count(*) AS numTrails
    FROM Trails
    WHERE state_name = '${state}'
    `;


    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
        connection.query(`SELECT DISTINCT scientific_name
        FROM Species
        WHERE category = '${category}' AND park_name = '${park}'`, 
        function (error, results, fields) {
            if (results.length > 0) {
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
            if (results.length > 0) {
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
    WHERE p.state = '${state}' LIMIT 100
    `;
    // console.log(query)
    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
        ORDER BY density DESC
        LIMIT 5
    `;

    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
    WHERE common_names LIKE '%${name}%'
    GROUP BY state
    ORDER BY count(scientific_name) desc
    LIMIT 5
    `;
    //console.log(query)
    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
      SELECT (t.acres/a.area)*100 as percent
      FROM Area a join total_acres t on a.state = t.state
      WHERE a.state = '${state}';      
    `;

    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
            // console.log(results)
            res.json({ results: results })
        } else {
            res.json({ results: [null]})
        }
    });
}

// Route 10 (handler)
async function park_feature(req, res) {
    const feature = req.query.feature
    const park = req.query.park
    var query = `SELECT * 
    FROM Features s 
    WHERE s.park_name = '${park}' and s.feature_name = '${feature}'
    `;

    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
        if (results.length > 0) {
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
    var query = `WITH birding_park as (
        select distinct Park.park_name AS park_name
        From Park join (
        select a.park_name AS park
        From Activities a
        Where a.activity_name = 'birding'
        ) x on x.park = Park.park_name
        where Park.state = '${state}'
    ),
    species_park as (
        select Park.park_name AS park_name, a.scientific_name as species_name, a.conservation_status
        From Park join (
        select s.park_name as park, s.conservation_status, s.scientific_name
        From Species s
        Where s.conservation_status = 'Endangered' OR s.conservation_status = 'species_of_concern' OR s.conservation_status = 'Threatened'
        AND s.category = 'Bird'
        ) a on a.park = Park.park_name
        Where Park.state = '${state}'
    )
    select s.park_name as park_name, s.species_name, s.conservation_status
    From birding_park b join species_park s
    on s.park_name = b.park_name
    group by s.park_name, s.species_name, s.conservation_status
        `;

    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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

    var query = `WITH fishing_park as (
        select distinct Park.park_name AS park_name
        From Park join (
        select a.park_name AS park
        From Activities a
        Where a.activity_name = 'fishing'
        ) x on x.park = Park.park_name
        where Park.state = '${state}'
    ),
    species_park as (
        select Park.park_name AS park_name, a.scientific_name as species_name, a.conservation_status
        From Park join (
        select s.park_name as park, s.conservation_status, s.scientific_name
        From Species s
        Where s.conservation_status = 'Endangered' OR s.conservation_status = 'species_of_concern' OR s.conservation_status = 'Threatened'
        AND s.category = 'Fish'
        ) a on a.park = Park.park_name
        Where Park.state = '${state}'
    )
    select s.park_name as park_name, s.species_name, s.conservation_status
    From fishing_park f join species_park s
    on s.park_name = f.park_name
    group by s.park_name, s.species_name, s.conservation_status
    `;

    connection.query(query, function (error, results, fields) {
        if (results.length > 0) {
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
    scientific_state,
    park_feature,
    state_birding
}