import { RedisClientType } from "@node-redis/client";
import { Request,Response } from "express";
import {Model}  from "mongoose";
import WordleUser from "../model/WordleUser";
import * as jwt from "jsonwebtoken"

export async function VerifyAdmin(req:Request,res:Response,next){
    const db :Model<WordleUser> = req.app["db"];
    const redis : RedisClientType= req.app["redis"];
    const props = {...req.body,...req.params}
    if(validateAdminProps(props)){
        const token = props.token;
        let decriptedToken = jwt.decode(token)!;
        let data = await db.findOne<WordleUser>(decriptedToken["id"]);
        if(data?.Admin){
            next()
        }
        else{
            res.status(401).send("ERROR: You need to be an admin to see this")
        }
    }
    else{
        res.status(401).send("ERROR: Invalid Props")
    }
}

function validateAdminProps(props){
    return props&&props.token
}
