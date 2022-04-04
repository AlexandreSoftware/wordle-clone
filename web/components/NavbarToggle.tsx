import { faAngleDown, faAngleUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
import Style from "../styles/Navbar.module.css"
export default function NavbarToggle({Toggle,state}) {
    const [themeContext,SetThemeContext] = useContext(ThemeContext);

    return(
        <div className={`p-2 py-1 border border-top-0 d-inline-block ${Style.toggle}`} onClick={()=>{Toggle(!state)}}>
            <FontAwesomeIcon icon={state?faAngleDown:faAngleUp} width={10} color={themeContext.SecondaryColor.toString()}></FontAwesomeIcon>
        </div>
    )
}