export default function GetToken(colors:any,setColors:any){
    let token = localStorage.getItem("token");
    
    if(token){
        return token
    }
    return ""
}