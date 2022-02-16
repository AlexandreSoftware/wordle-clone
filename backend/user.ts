import { Request,Response } from "express"
export default{
    get :  (req:Request,res:Response)=>{
        res.status(200).send("hello world");
    },
    post : (req:Request,res:Response)=>{
        res.status(200).send("four in the morning but were having such a lovely time")
    }
}