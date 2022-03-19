import { ExpandedConnection } from "../model/ExpandedConnection";
import {UserGetId,userGetAll,UserPost,UserPut} from "../Api/User" ;
import { Login } from "../Api/UserLogin";
import { InsertWordleGame, WordleTryQuestion } from "../Api/Wordle";
import Auth from "../Api/Auth";
module.exports=function live(app:ExpandedConnection){
    app.route("/user/:id")
    .get(UserGetId)
    app.route("/user")
    .get(Auth,userGetAll)
    .post(Auth,UserPost)
    .put(UserPut)
    app.route("/login")
        .get(Login)
    app.route("/wordle")
        .put(Auth,InsertWordleGame)
    app.route("/wordle/guess")
        .post(Auth,WordleTryQuestion)
    app.route("/auth")
        .get(Auth)

}
