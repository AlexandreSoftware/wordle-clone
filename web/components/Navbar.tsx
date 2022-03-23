import { Button, Nav} from "react-bootstrap";
import  Navbar  from "react-bootstrap/Navbar";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from "../styles/Navbar.module.css"
import "font-awesome/css/font-awesome.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import ThemeContext from "../utils/ThemeContext";
import { useContext } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
export default function NavBar(){
    
    let formattedbutton = "m-2 text-center rounded px-3"
    let [context,setContext] = useContext(ThemeContext)
    function invertColors(){
        if(context.PrimaryColor=="white")
            setContext({PrimaryColor:"dark",SecondaryColor:"white"})
        else
            setContext({PrimaryColor:"white",SecondaryColor:"dark"})
    }
    return (
    <Navbar bg={context.PrimaryColor.toString()} className={`border-bottom border-${context.SecondaryColor}`} expand="sm">
        <Image src="/logo.svg" width={100} height={100} alt="Logo"/>
        <Navbar.Toggle aria-controls="navbar"
         className={`${Styles.navbar_default} border-${context.SecondaryColor}`}>
            <FontAwesomeIcon width={50} height={30} icon={faBars} className={`text-${context.SecondaryColor}`}/>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar" >
            <motion.div>
                <Nav.Link  href="/" className={`${formattedbutton} bg-${context.SecondaryColor} text-${context.PrimaryColor} `}>Wordle</Nav.Link>
            </motion.div>
            <motion.div>
                <Nav.Link  href="/" className={`${formattedbutton} bg-${context.SecondaryColor} text-${context.PrimaryColor} `} >Profiles</Nav.Link>
            </motion.div>
            <Nav className={Styles.RightButton}>
                <Button className="my-2 my-2 py-0 px-3" variant={context.SecondaryColor=="dark"?"dark":"light"} onClick={invertColors}><FontAwesomeIcon icon={context.PrimaryColor=="dark"?faMoon:faSun} width={20} height={20} /></Button>
                
                <Nav.Link className={`${formattedbutton} text-white bg-primary`} href="/Login">
                        Login
                </Nav.Link>
                <Nav.Link href="/Register" className={`${formattedbutton} text-white bg-danger`}>
                        Register
                </Nav.Link>

            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )  
}