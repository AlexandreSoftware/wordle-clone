export default function GetToken(){
    let token = localStorage.getItem("token");
    
    if(token){
        return token
    }
    return ""
}