import { Button, Nav} from "react-bootstrap";
import  Navbar  from "react-bootstrap/Navbar";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from "../styles/Navbar.module.css"
import "font-awesome/css/font-awesome.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";

export default function NavBar(){
    return (
    <Navbar bg="dark" expand="sm">
        <Image src="/logo.svg" width={100} height={100} alt="Logo"/>
        <Navbar.Toggle aria-controls="navbar"
         className={Styles.navbar_default+ " "}>
            <FontAwesomeIcon width={50} height={30} icon={faAlignJustify} className="text-white"/>         </Navbar.Toggle>
        <Navbar.Collapse id="navbar" >
            <Nav.Link className="text-white m-2 text-center">Wordle</Nav.Link>
            <Nav.Link className="text-white justify-self-start m-1 text-center" >Profiles</Nav.Link>
            <Nav className={Styles.RightButton}>
                    <Button variant="primary" className="my-4 mx-1" >
                        <Nav.Link className="m-1 text-white " href="/Login">
                            Login
                        </Nav.Link>
                    </Button>
                    <Button variant="secondary" className="my-4 mx-1">
                        <Nav.Link href="/Register" className={Styles.link+ " text-center text-white"}>
                            Register
                        </Nav.Link>
                    </Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )  
}