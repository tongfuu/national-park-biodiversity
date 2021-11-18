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

export {
    welcome,
    num_trails_state,
    get_parks
}