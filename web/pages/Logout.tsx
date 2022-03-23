import GetToken from "../utils/GetToken";
import ThemeContext from "../utils/ThemeContext";
import { useContext, useEffect } from "react";
import Router from "next/router";
export default function Logout() {
    let [context,setContext] = useContext(ThemeContext)
    useEffect(()=>{
            let token = GetToken(context,setContext)   
            if(token!=""){
                localStorage.removeItem("token")
            }
            Router.push("/")
    },[]);
    return (<></>)
}