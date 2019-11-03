const config = require('./config.json');

//config.json we have the possibility to change the names to save it in the database

//and this one is for saving the names, and comparing it to change it afterwards

config.thingy.device = {};
config.thingy.IDS = {};
config.thingy.UUIDS = {};

Object.keys(config.thingy.services).forEach((k) => {
    config.thingy.UUIDS[config.thingy.services[k]] = k;
});
Object.keys(config.thingy.characteristics).forEach((k) => {
    config.thingy.UUIDS[config.thingy.characteristics[k]] = k;
});

module.exports = config;