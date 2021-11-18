import config from './config.json'

const welcome = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/hello`, {
        method: 'GET',
    })
    return res.json()
}

export {
    welcome,
}