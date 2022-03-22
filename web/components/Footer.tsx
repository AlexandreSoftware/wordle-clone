import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Styles from "../styles/Footer.module.css"
export default function Footer() {
    return (<div className={Styles.footer +" text-center"}>Made with love by xandrf <FontAwesomeIcon icon={faHeart} width={10} height={10} color="red" className={Styles.footer}/> </div>)
}