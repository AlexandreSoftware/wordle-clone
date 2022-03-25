import { Button, Nav} from "react-bootstrap";
import  Navbar  from "react-bootstrap/Navbar";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from "../styles/Navbar.module.css"
import "font-awesome/css/font-awesome.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faArrowRightFromBracket, faBars, faMoon, faPerson, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import ThemeContext from "../utils/ThemeContext";
import { useContext, useEffect } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import TokenContext from "../utils/TokenContext";
import GetToken from "../utils/GetToken";
export default function NavBar(){
    let [tokenContext,setTokenContext] = useContext(TokenContext)
    let formattedbutton = "m-2 text-center rounded px-3"
    let [context,setContext] = useContext(ThemeContext)
    function invertColors(){
        if(context.PrimaryColor=="white")
            setContext({PrimaryColor:"dark",SecondaryColor:"white"})
        else
            setContext({PrimaryColor:"white",SecondaryColor:"dark"})
    }
    
    useEffect(()=>{
        GetToken(context,setContext)
    },[])
    return (
    <Navbar 
        bg={context.PrimaryColor.toString()}
         className={`${Styles.Navbar} border-bottom border-${context.SecondaryColor} py-0`} 
         expand="sm">
        <Image src="/logo.svg" width={50} height={50} alt="Logo"/>
        <Navbar.Toggle aria-controls="navbar"
         className={`${Styles.navbar_default} border-${context.SecondaryColor}`}>
            <FontAwesomeIcon width={25} height={25} icon={faBars} className={`text-${context.SecondaryColor}`}/>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar" >
            <Nav.Link  href="/Wordle" className={`${formattedbutton} bg-${context.SecondaryColor} text-${context.PrimaryColor} `}>Wordle</Nav.Link>
            <Nav.Link  href="/Profiles" className={`${formattedbutton} bg-${context.SecondaryColor} text-${context.PrimaryColor} `} >Profiles</Nav.Link>

            <Nav className={Styles.RightButton}>
            <Button className="my-2 my-2 py-0 px-3" variant={context.SecondaryColor=="dark"?"dark":"light"} onClick={invertColors}><FontAwesomeIcon icon={context.PrimaryColor=="dark"?faMoon:faSun} width={20} height={20} /></Button>
                {tokenContext==""?
                <>
                    <Nav.Link className={`${formattedbutton} text-white bg-primary`} href="/Login">
                            Login
                    </Nav.Link>
                    <Nav.Link href="/Register" className={`${formattedbutton} text-white bg-danger`}>
                            Register
                    </Nav.Link>
                </>:
                <>
                    <Nav.Link className={`${formattedbutton} text-white bg-primary`} href="/Account">
                            <FontAwesomeIcon icon={faUser} width={15} height={15}/> Account
                    </Nav.Link>
                    <Nav.Link href="/Logout" className={`${formattedbutton} text-white bg-danger`}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} width={15} height={15}/> Logout
                    </Nav.Link>
                </>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )  
}