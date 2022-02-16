import express from "express";
import mongo from "mongoose"
import { ExpandedConnection } from "./ExpandedConnection";
import MongoSchema from "./MongoSchema";
import consign from "consign";
const tempapp : any= express();
mongo.connect("mongodb://localhost:27017/wordle");
tempapp.db = mongo.model("wordle",MongoSchema);
let app : ExpandedConnection = tempapp

consign({ extensions: [ '.js', '.json', '.node', '.ts' ] })
    .then("./middlewares.ts")
    .then("./routes.ts")
    .into(app)
app.listen(3000,()=>console.log("Test"))
