import { useContext } from "react"
import ThemeContext from "../utils/ThemeContext"
import { motion } from "framer-motion"
import Footer from "./Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faSpinner,faCircleNotch } from "@fortawesome/free-solid-svg-icons"

export default function LoadingGame() {
    let [themeContext,SetThemeContext] = useContext(ThemeContext)
    return(
    <div className={`h-100 w-100 text-${themeContext.SecondaryColor} bg-${themeContext.PrimaryColor} d-flex justify-content-center align-items-center position-absolute flex-column`}>
        <div className="mb-4">Loading ...</div>

        <motion.div animate={{
            rotate: [0,360],
        }}
        transition={{
            repeat:Infinity,
            duration: 1,
        }}>
            <FontAwesomeIcon icon={faCircleNotch} color={"white"} width={50} height={50}></FontAwesomeIcon>
        </motion.div>
        
    </div>
        )
}