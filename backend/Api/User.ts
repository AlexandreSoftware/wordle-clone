import e, { Request,Response } from "express"
import WordleUser from "../model/WordleUser";
import bcrypt from  "bcrypt-nodejs";
import mongo from "mongoose";
import Game from "../model/Game";
import { isObject } from "util";
export async function userGetAll(req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    await db.find().exec((err,obj)=>{
        if(err){
            console.log(err)
            res.status(500).send("ERROR");
        }
        else{
            obj.map(x=>{
                x["__v"]=undefined;
                x.Password="";
                x.Games = (x.Games?.map((x:Game)=>{
                    if(x.Finished==false){
                        x.CorrectWord={
                            name:"",
                            relation:x.CorrectWord.relation
                        };
                    }
                    return x;
                }))
                return x;
            });
            res.send(obj)
        }
    });
    
}
export async function UserGetId (req:Request,res:Response){
    let db : mongo.Model<WordleUser> = req.app["db"]; 
    
    db.findOne({_id:mongo.Types.ObjectId.createFromHexString(req.params.id)}).exec((err,obj)=>
        {
            if(err){
                console.log(err)
                res.status(500).send("ERROR");
            }
            if(obj != null){
                let formatedGames= (obj.Games?.map((x:Game)=>{
                    if(x.Finished==false){
                        x.CorrectWord={
                            name:"",
                            relation:x.CorrectWord.relation
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
                obj["__v"]=undefined
                res.send(obj)
            }
        })
        
    }
    else{
        res.status(401).send("UserName Already Exists")
    }
}
export async function DeleteUser(req:Request,res:Response){
    
}

export async function Register(req:Request,res:Response){
    let db:mongo.Model<WordleUser> = req.app["db"];
    const props = {...req.body,...req.params,...req.headers}
    if(ValidateRegister(props)){
        let user :WordleUser = {
            Admin:false,
            UserName:props.UserName,
            Password:bcrypt.hashSync(req.body.Password)
        }
        let obj = new db(user);
        obj.save((err,obj)=>{
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
                obj["__v"]=undefined
                res.send(obj)
            }
        })
    }
    else{
        res.status(401).send("invalid args")
    }
}
function ValidateRegister(props){
    return props&&props.UserName&&props.Password
}
async function ValidateUser(user:WordleUser,db:mongo.Model<WordleUser>){
    let obj = await db.findOne(x=>x.UserName==user.UserName).clone().exec();
    return !!obj||obj!==undefined||obj!==null;
}
