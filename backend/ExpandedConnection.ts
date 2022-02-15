import express,{request,response,Router} from "express"
import  mongo from "mongoose"
let app = typeof express();


export interface ExpandedConnection extends express.Application{
    db : mongo.Model<any,any>
}
