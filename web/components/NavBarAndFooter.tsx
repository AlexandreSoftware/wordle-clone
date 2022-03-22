import Footer from "./Footer";
import NavBar from "./Navbar";
import Styles from "../styles/NavbarAndFooter.module.css"
export default function NavBarAndFooter({...props}) {
    return (
    <div className={Styles.content}>
        <NavBar/>
            {props.children}
        <Footer/>
    </div>)
}