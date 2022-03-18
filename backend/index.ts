import express from "express";
import mongo from "mongoose"
import { ExpandedConnection } from "./model/ExpandedConnection";
import MongoSchema from "./model/Schema/MongoSchema";
import consign from "consign";
const tempapp : any= express();
mongo.connect("mongodb://localhost:27017/wordle");
tempapp.db = mongo.model("wordle",MongoSchema);
let app : ExpandedConnection = tempapp

let port = 3000;
consign({ extensions: [ '.js', '.json', '.node', '.ts' ] })
    .then("./config/middlewares.ts")
    .then("./config/routes.ts")
    .into(app)
app.listen(port,()=>console.log(`Running Backend on port ${port}`))
