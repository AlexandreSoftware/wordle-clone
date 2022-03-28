<<<<<<< Updated upstream
=======
import { useEffect } from "react";

>>>>>>> Stashed changes
export default function GetToken(){
    let token = localStorage.getItem("token");
    
    if(token){
        return token
    }
    return ""
}