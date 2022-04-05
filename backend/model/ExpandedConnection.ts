import express from "express"
import  mongo from "mongoose"
import MongoSchema from "./Schema/MongoSchema"
import {RedisClientType} from "redis"
export interface ExpandedConnection extends express.Application{
    db : typeof MongoSchema
    redis: RedisClientType
}
