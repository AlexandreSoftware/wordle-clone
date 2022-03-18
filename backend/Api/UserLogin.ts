import { Request,Response } from "express"
import bcrypt from "bcrypt";
import mongo from "mongoose";
import WordleUser from "../model/WordleUser";
export async function  Login(req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    let response = await db.findOne({UserName: req.body.UserName})
    if(response!=undefined){
        if(bcrypt.compareSync(req.body.Password,response.Password.toString())){
            res.send("LoggedIn")
        }
        else{
            res.status(501).send("Error")
        }
    }
    else{
        res.status(501).send("Error")
    }
    res.send(response)
}