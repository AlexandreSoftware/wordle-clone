import Footer from "./Footer";
import NavBar from "./Navbar";
import Styles from "../styles/NavbarAndFooter.module.css"
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
export default function NavBarAndFooter({...props}) {
    let [context,setContext] = useContext(ThemeContext)
    return (
    <div className={`${Styles.content} bg-${context.PrimaryColor}`}>
        <NavBar/>
            {props.children}
        <Footer/>
    </div>)
}