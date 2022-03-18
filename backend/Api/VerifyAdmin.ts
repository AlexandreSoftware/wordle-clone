import { Request,Response } from "express";
export default function VerifyAdmin(req:Request,res:Response){
    
}
function validateAdminProps(props){
    return props&&props.user&&props.isAdmin
}
