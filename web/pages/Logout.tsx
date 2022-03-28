import GetToken from "../utils/GetToken";
import ThemeContext from "../utils/ThemeContext";
import { useContext, useEffect } from "react";
import Router from "next/router";
export default function Logout() {
    useEffect(()=>{
            let token = GetToken()   
            if(token!=""){
                localStorage.removeItem("token")
            }
            Router.push("/")
    },[]);
    return (<></>)
}