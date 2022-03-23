import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import Styles from "../styles/Footer.module.css"
import ThemeContext from "../utils/ThemeContext"
export default function Footer() {
    let [context,setContext] = useContext(ThemeContext)
    return (<div className={Styles.footer +" text-center text-"+context.SecondaryColor}>Made with love by xandrf <FontAwesomeIcon icon={faHeart} width={10} height={10} color="red" className={Styles.footer}/> </div>)
}