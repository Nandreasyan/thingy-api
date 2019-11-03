//const mqtt = require('mqtt');
const mqtt = require('async-mqtt');
const config = require('./config.js');

// this one is for the connection, this connects with the mqtt broker

let client;

const host = "mqtt://mqtt.thing.zone";

function lookup(obj, prop) {
    return prop in obj ? obj[prop] : prop;
  }


  function onConnect(){
    console.log("OnConnect....");
    const subscribe = '#';
    client.subscribe(subscribe, (err) => {
        if (err) {
            console.log("error");
        } else {
            console.log("Connected....");
        }
    })
};

  function onMessage(topic, message){
    const [deviceUri, serviceUUID, charUUID] = topic.split('/');
    //console.log("Element: " + charUUID);
    const characteristic = lookup(config.thingy.characteristics, charUUID);

    client.emit(characteristic, {data: message})

};

function mqttInit() {
    client = mqtt.connect(
        host, {
            port:1895,
            username:"green" ,
            password: "1ea713ca2e",
            topic: '#'
        }
    )

    client.on('connect', onConnect);

    client.on('error', () => {
        console.log("Unable to connect")
    });
    client.on('message', onMessage);    
    

    return client;
};


function getClient() {
    if (!client) {
        client = mqttInit();
      }
      return client;
}

module.exports = {
    getClient
};

