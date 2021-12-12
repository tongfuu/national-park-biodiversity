import config from './config.json'

const welcome = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/hello`, {
        method: 'GET',
    })
    return res.json()
}

const num_trails_state = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/map/num_trails?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}

const get_parks = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/map/parks_in_state?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}


const get_common_animals = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/map/common_animals_state?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}



const park_feature = async (park, feature) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trail/park_feature?park=${park}&feature=${feature}`, {
        method: 'GET',
    })
    return res.json()
}

const park_activity = async (park, activity) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trail/park_activity?park=${park}&activity=${activity}`, {
        method: 'GET',
    })
    return res.json()
}

const park_category = async (park, category) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/search_species?category=${category}&park=${park}`, {
        method: 'GET',
    })
    return res.json()
}

const park_state = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/species_state?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}

const birding_state = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trail/state_birding?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}

const fishing_state = async (state) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trail/state_fishing?state=${state}`, {
        method: 'GET',
    })
    return res.json()
}

const scientific_state = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/scientific_state?name=${name}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    welcome,
    num_trails_state,
    get_parks,
    get_common_animals,
    park_feature,
    park_activity,
    park_category,
    park_state,
    birding_state,
    fishing_state,
    scientific_state
}