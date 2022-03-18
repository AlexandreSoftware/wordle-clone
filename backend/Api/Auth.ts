import { RedisClientType } from "@node-redis/client";
import { Request,Response } from "express";
import { ExpandedConnection } from "../model/ExpandedConnection";
export default async function Auth(req:Request,res:Response){
    let redis:RedisClientType= req.app["redis"];
    await redis.set("banana","test");
    redis.expire("banana",10)
    res.send(await redis.get("banana"));
}