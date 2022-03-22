import Head from "next/head";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import NavBarAndFooter from "../components/NavBarAndFooter";
import Styles from "../styles/Login.module.css"
export default function Login(){
    return (
        <>
            <Head>
                <title>Wordle</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <NavBarAndFooter>
                <FormControl className={Styles.LoginScreen}>

                </FormControl>
            </NavBarAndFooter>
        </>
    )      
}