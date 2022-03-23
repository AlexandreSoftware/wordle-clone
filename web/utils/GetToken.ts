export default function GetToken(colors:any,setColors:any){
    let token = localStorage.getItem("token");
    console.log(token)
    if(token){
        return token
    }
    return ""
}