import { Request,Response } from "express"
import WordleUser from "../model/WordleUser";
import bcrypt from  "bcrypt-nodejs";
import { ExpandedConnection } from "../model/ExpandedConnection";
import mongo from "mongoose";
export async function UserGet (req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    let obj = await db.findOne({_id:mongo.Types.ObjectId.createFromHexString(req.params.id)}).exec();
    
    if(obj != null){
        let response : WordleUser = {
            _id : obj._id,
            UserName : obj.UserName,
            Password : obj.Password,
            Admin : obj.Admin,
            Games : obj.Games
        }
        res.send(response)
    }
    else{
        res.status(403).send("ERROR")
    }
};
export async function UserPost(req:Request,res:Response){
    
    let IsAdmin :boolean = req.body.isAdmin;
    let user : WordleUser={

        UserName:req.body.UserName,
        Password:bcrypt.hashSync(req.body.Password),
        Admin:IsAdmin
    }
    let db : mongo.Model<WordleUser> = req.app["db"]; 
     await db.updateOne({ _id: req.body.Id },user).exec()
    return res.send(true)
};
export function UserPut(req:Request,res:Response){
    let IsAdmin :boolean = req.body.isAdmin;
    let user : WordleUser={
        UserName:req.body.UserName,
        Password:bcrypt.hashSync(req.body.Password),    
        Admin:IsAdmin
    }
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    let obj = new db(user)
    obj.save()
    return res.send(obj)
}
