import GetToken from "./GetToken";

export default function SetToken(setState) {
    let token =GetToken()
    if(token){
      setState(true)
    }
    else{
      setState(false)
    }
}