import { RedisClientType } from "@node-redis/client";
import { Request,Response } from "express";
import * as jwt from "jsonwebtoken";
let config = require("../config/config")
export default async function Auth(req:Request,res:Response,next){
    let redis:RedisClientType= req.app["redis"];
    let args = {...req.body,...req.headers}
    if(validateAuth(args)){
        let result = await redis.get(args.token)!
        console.log(result)
        if(result&&jwt.verify(args.token,config.secretkey)){
            next();
        }
        else{
            res.status(401).send("ERROR:Invalid Token")
        }
    }
    else{
        res.status(401).send("ERROR:Invalid args")
    }
}

function validateAuth(args){
    return args&&!!args.token&&args.id
}