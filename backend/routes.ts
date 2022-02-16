import { ExpandedConnection } from "./ExpandedConnection";
import user from "./user" ;
module.exports=function live(app:ExpandedConnection){
    app.route("/a")
    .get(user.get)
    .post(user.post)
}
