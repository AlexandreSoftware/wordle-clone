import axios from "axios"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import Router from 'next/router'
import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import ThemeContext from "../utils/ThemeContext"
export default function Register(){
    let [context,setContext] = useContext(ThemeContext)
    let [username,SetUsername] = useState("");
    let [password,Setpassword] = useState("");
    function handleSubmit(e:any){
        e.preventDefault();
        let formjson = {
            UserName:username,
            Password:password
        }
        axios.put("http://localhost:8000/register",formjson,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
                },
        }).then(obj=>
            {
                console.log(obj)
                Router.push("/")
            }
            ,err=>{
                //TODO: implement modal
                console.log(err)
            })
        
    }
    return(
       <div className={" h-100 d-flex justify-content-center align-items-center mt-5"}>
            <motion.form initial={{x:"-100vw"}} animate={{x:0}} transition={{ease: "easeIn",duration: 0.8,type:"tween"}} onSubmit={handleSubmit} >
                <Form.Group className={` border-secondary border-radius-20 rounded p-5 bg-${context.SecondaryColor=="dark"?"dark":"white"} text-${context.PrimaryColor} `}>
                    <h2>Register</h2>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(e)=>{SetUsername(e.target.value)}}  type="text" placeholder="Username"/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e)=>{Setpassword(e.target.value)}} type="password" placeholder="Password"/>
                    <Button type="submit"  className="mt-2 w-100">Register</Button>
                </Form.Group>
            </motion.form>
        </div>
    )
}