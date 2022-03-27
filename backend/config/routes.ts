import { ExpandedConnection } from "../model/ExpandedConnection";
import {UserGetId,userGetAll,UserPost,UserPut, UserDelete, Register} from "../Api/User" ;
import { Login } from "../Api/UserLogin";
import { GetWordleGame, InsertWordleGame, WordleTryQuestion } from "../Api/Wordle";
import Auth from "../Api/Auth";
import {VerifyAdmin,CheckForPermission} from "../Api/VerifyAdmin";
module.exports=function live(app:ExpandedConnection){
    app.route("/login")
        .post(Login)
    app.route("/register")
        .put(Register)
    app.route("/user/:id")
    .get(Auth,CheckForPermission,UserGetId)
    app.route("/user")
    .get(Auth,VerifyAdmin,userGetAll)
    .post(Auth,CheckForPermission, UserPost)
    .put(Auth,VerifyAdmin,UserPut)
    .delete(Auth,CheckForPermission,UserDelete)
    app.route("/wordle")
        .get(Auth,CheckForPermission,GetWordleGame)
        .put(Auth,CheckForPermission,InsertWordleGame)
    app.route("/wordle/guess")
        .post(Auth,CheckForPermission,WordleTryQuestion)
}
