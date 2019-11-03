const mqtt = require('./mqtt.js').getClient();
const redis = require('ioredis');

const client = redis.createClient();
let timestamp = new Date().getTime();

// in this file we will save the data in the database!
//still needs to add to the database

mqtt.on('temperature', async ({data}) => {
    const temperature = parseFloat(data);
    await client.xadd("table", 'MAXLEN', '~', 1000, '*',
        'temperature', temperature, "timestamp", timestamp).then(function(id) {
              console.log("id:", id);
    });
    //console.log("temperature: " + temperature);
});

mqtt.on("light_intensity", async ({data}) => {
    const light_intensity = parseFloat(data);
    await client.xadd("table", 'MAXLEN', '~', 1000, '*',
        'light_intensity', light_intensity, "timestamp", timestamp).then(function(id) {
              console.log("id:", id);
    });
    console.log("light_intensity: " + light_intensity);
});