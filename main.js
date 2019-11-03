const Koa = require('koa');
const Router = require('koa-router');
const env = require('dotenv');
const bodyParser = require('koa-bodyparser');
const mqtt = require('./mqtt.js').getClient();
require('./data.js');
// XREAD Count 0 STREAMS table 10 --> command in redis to read the table
//in this one we will organize all paths for the other files
mqtt;

const app = new Koa();

const router = new Router();


app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());