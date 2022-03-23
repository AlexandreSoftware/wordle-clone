import { useContext } from "react";
import { Form, Nav } from "react-bootstrap";
import Styles from "../styles/Login.module.css"
import ThemeContext from "../utils/ThemeContext";
import { Button } from "react-bootstrap";
import Link from "next/link";
export default function Login(){
    let [context,setContext] = useContext(ThemeContext)
    return (    
        <>
                <div className={Styles.LoginScreen +" h-100 d-flex justify-content-center align-items-center"}>
                    <Form.Group className={Styles.LoginForm + ` border-secondary border-radius-20 rounded p-5 bg-${context.SecondaryColor=="dark"?"dark":"white"} text-${context.PrimaryColor} `}>
                        <h2>Login</h2>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" placeholder="UserName"/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="UserName"/>
                        <Button type="submit"  className="mt-2 w-100">Login</Button>
                        Don't have an account <Link href="/Register">sign up</Link>
                    </Form.Group>
                </div>
        </>
    )      
}