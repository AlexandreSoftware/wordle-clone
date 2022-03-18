import express from "express"
import  mongo from "mongoose"
import MongoSchema from "./Schema/MongoSchema"

export interface ExpandedConnection extends express.Application{
    db : typeof MongoSchema
}
