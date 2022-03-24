import { Request,Response } from "express"
import bcrypt from "bcrypt";
import mongo from "mongoose";
import WordleUser from "../model/WordleUser";
import * as jwt from "jsonwebtoken"
import { RedisClientType } from "@node-redis/client";
let config = require("../config/config")
export async function  Login(req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    let redis :RedisClientType= req.app["redis"]; 
    let response = await db.findOne({UserName: req.body.UserName}).clone()
    if(response!=undefined&&response.Password!= undefined){
        if(bcrypt.compareSync(req.body.Password,response.Password.toString())){
            let token = jwt.sign({username:response.UserName,Id:response._id},config.secretkey)
            redis.set(token,response.UserName.toString())
            redis.expire(token,604800)
            res.send(token)
        }
        else{
            res.status(401).send("Error")
        }
    }
    else{
        res.status(401).send("Error")
    }
}
