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
        let data = await db.findOne<WordleUser>(decriptedToken["id"]).clone();
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
export async function CheckForPermission(req:Request,res:Response,next){
    const db :Model<WordleUser> = req.app["db"];
    const redis : RedisClientType= req.app["redis"];
    const props = {...req.body,...req.params,...req.headers}
    if(validatePermissionProps(props)){
        const token = props.token;
        let decriptedToken = jwt.decode(token)!;
        let data = await db.findOne<WordleUser>({_id : decriptedToken["Id"]}).clone();

        if(props.id){
            let comparedata = await db.findOne({_id:props.id}).clone()
            if(data?.Admin||comparedata?.id ==data?._id ){
                next();
            }
            else{
                res.status(401).send("ERROR: You need to be an admin or the same user to see this")
            }
        }
        else if(props.UserName){
            let comparedata = await db.findOne(x=>x.UserName==props.UserName).clone()
            if(comparedata?.Admin||comparedata?.UserName==data?.UserName){
                next();
            }
            else{
                res.status(401).send("ERROR: You need to be an admin or the same user to see this")
            }
        }
        else{
            res.status(500).send()
        }
    }
    else{
        res.status(401).send("ERROR: Invalid Props")
    }
}
function validatePermissionProps(props){
    return props&&(props.id||props.UserName)
}
function validateAdminProps(props){
    return props&&props.token
}
