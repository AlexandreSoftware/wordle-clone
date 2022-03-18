import { ExpandedConnection } from "../model/ExpandedConnection";
import {UserGet,userGetAll,UserPost,UserPut} from "../Api/User" ;
import { Login } from "../Api/UserLogin";
import { InsertWordleGame, WordleTryQuestion } from "../Api/Wordle";
import Auth from "../Api/Auth";
module.exports=function live(app:ExpandedConnection){
    app.route("/user/:id")
    .get(UserGet)
    app.route("/user")
    .get(userGetAll)
    .post(UserPost)
    .put(UserPut)
    app.route("/login")
        .get(Login)
    app.route("/wordle")
        .put(InsertWordleGame)
    app.route("/wordle/guess")
        .post(WordleTryQuestion)
    app.route("/auth")
        .get(Auth)

}
