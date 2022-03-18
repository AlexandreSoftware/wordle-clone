import e, { Request,Response } from "express"
import WordleUser from "../model/WordleUser";
import bcrypt from  "bcrypt-nodejs";
import mongo from "mongoose";
import Game from "../model/Game";
export async function userGetAll(req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    let obj = await db.find().exec();
    res.send(obj)
}
export async function UserGet (req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    
    let obj = db.findOne({_id:mongo.Types.ObjectId.createFromHexString(req.params.id)}).exec((err,obj)=>
        {
            if(err){
                console.log(err)
                res.status(500).send("ERROR");
            }
            if(obj != null){
                let formatedGames= (obj.Games?.map((x:Game)=>{
                    if(x.Finished==false){
                        x.CorrectWord={
                            index:x.CorrectWord.index,
                            word:{
                                name:"",
                                relation:x.CorrectWord.word.relation
                            }
                        };
                    }
                    return x;
                }));
                let response : WordleUser = {
                    _id : obj._id,
                    UserName : obj.UserName,
                    Admin : obj.Admin,
                    Games : formatedGames,
                }
                res.send(response)
            }
            else{
                res.status(403).send("ERROR")
            }
        })
};
export async function UserPost(req:Request,res:Response){
    
    let IsAdmin :boolean = req.body.isAdmin;
    let user : WordleUser={

        UserName:req.body.UserName,
        Password:bcrypt.hashSync(req.body.Password),
        Admin:IsAdmin
    }
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    await db.updateOne({ _id: req.body.Id },user).exec((err,obj)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error")
        }
        else{
            return res.send(obj.modifiedCount!=0)
        }
    })
    
};
export async function UserPut(req:Request,res:Response){
    let IsAdmin :boolean = req.body.isAdmin;
    let user : WordleUser={
        UserName:req.body.UserName,
        Password:bcrypt.hashSync(req.body.Password),    
        Admin:IsAdmin
    }
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    if(await ValidateUser(user,db)){
        let obj = new db(user)
        
        await obj.save((err,obj)=>{
            
            if(err){
                console.log(err)
                if(err.message.includes("duplicate key error collection:")&&err.message.includes("dup key: { UserName:")){
                    res.status(501).send("ERROR:UserName Already Exists")
                }
                else{
                    res.status(500).send("ERROR")
                }
            }
            else{
                obj.Password=undefined
                res.send(obj)
            }
        })
        
    }
    else{
        res.status(401).send("UserName Already Exists")
    }
}

async function ValidateUser(user:WordleUser,db:mongo.Model<WordleUser>){
    let obj = await db.findOne(x=>user.UserName).clone().exec();
    return !!obj;
}