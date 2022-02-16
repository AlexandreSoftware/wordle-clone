import express from "express"
import  mongo from "mongoose"

export interface ExpandedConnection extends express.Application{
    db : mongo.Model<any,any>
}
