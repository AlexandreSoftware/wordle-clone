import CorrectWord from "./CorrectWord"
import Game from "./Game"
export default interface WordleUser{
    _id?:string 
    UserName: String,
    Password:String,
    Admin:Boolean,
    Games?:Game[]
}