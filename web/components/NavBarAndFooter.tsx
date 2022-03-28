import Footer from "./Footer";
import NavBar from "./Navbar";
import Styles from "../styles/NavbarAndFooter.module.css"
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../utils/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { exit } from "process";
import NavbarToggle from "./NavbarToggle";
export default function NavBarAndFooter({...props}) {
    let [themeContext,setContext] = useContext(ThemeContext);
    let [navbarToggle,SetNavbarToggle] = useState(true);
    useEffect(()=>{
        const PrimaryColor =  localStorage.getItem("PrimaryColor")
        const SecondaryColor = localStorage.getItem("SecondaryColor")
        if(PrimaryColor&&SecondaryColor){
            setContext({PrimaryColor,SecondaryColor})
        }
        else{
            localStorage.setItem("PrimaryColor",""+themeContext.PrimaryColor)
            localStorage.setItem("SecondaryColor",""+themeContext.SecondaryColor)
        }
    }
    ,[])
    return (
    <div className={`${Styles.content} bg-${themeContext.PrimaryColor}`}>
        <AnimatePresence>
            {navbarToggle &&<motion.div initial={{y:-100}} animate={{y:0}} transition={{ease: "easeIn",duration: 0.5,}} exit={{y:-100}}>
                <NavBar/>
            </motion.div>}
        </AnimatePresence>
        <NavbarToggle state={navbarToggle} Toggle={SetNavbarToggle}/>
            {props.children}
        <Footer/>
        
    </div>)
}