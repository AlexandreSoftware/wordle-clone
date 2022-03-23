import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { Form, Button } from "react-bootstrap"
import NavBarAndFooter from "../components/NavBarAndFooter"
import ThemeContext from "../utils/ThemeContext"
export default function Register(){
    let [context,setContext] = useContext(ThemeContext)
    return(
        <div className={" h-100 d-flex justify-content-center align-items-center"}>
            <motion.div initial={{y:-300}} animate={{y:0}} transition={{ease: "easeIn",duration: 0.8,}} >
                <Form.Group className={` border-secondary border-radius-20 rounded p-5 bg-${context.SecondaryColor=="dark"?"dark":"white"} text-${context.PrimaryColor} `}>
                    <h2>Register</h2>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                    <Button type="submit"  className="mt-2 w-100">Register</Button>
                </Form.Group>
            </motion.div>
        </div>
    )
}