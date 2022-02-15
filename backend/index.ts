import express from "express";
import mongo, { Schema } from "mongoose"
import { ExpandedConnection } from "./ExpandedConnection";
const app : any= express();
mongo.connect("mongodb://localhost:27017/wordle");
app.db = mongo.model("wordle");
let app2 : ExpandedConnection = app
