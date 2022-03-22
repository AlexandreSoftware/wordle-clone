import express from "express";
import mongo from "mongoose"
import { ExpandedConnection } from "./model/ExpandedConnection";
import MongoSchema from "./model/Schema/MongoSchema";
import consign from "consign";
import * as redis from "redis"
let config = require("./config/config")
const tempapp : any= express();
mongo.connect(config.mongo);
tempapp.db = mongo.model("wordle",MongoSchema);
tempapp.redis = redis.createClient(config.redis);
tempapp.redis.on('error', err => {
    console.log('Error ' + err);
});
let app : ExpandedConnection = tempapp
app.redis.connect()
let port = 8000;
consign({ extensions: [ '.js', '.json', '.node', '.ts' ] })
    .then("./config/middlewares.ts")
    .then("./config/routes.ts")
    .into(app)
app.listen(port,()=>console.log(`Running Backend on port ${port}`))
