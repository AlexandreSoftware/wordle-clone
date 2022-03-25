import Footer from "./Footer";
import NavBar from "./Navbar";
import Styles from "../styles/NavbarAndFooter.module.css"
import { useContext, useState } from "react";
import ThemeContext from "../utils/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { exit } from "process";
import NavbarToggle from "./NavbarToggle";
export default function NavBarAndFooter({...props}) {
    let [context,setContext] = useContext(ThemeContext);
    let [navbarToggle,SetNavbarToggle] = useState(true);
    return (
    <div className={`${Styles.content} bg-${context.PrimaryColor}`}>
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