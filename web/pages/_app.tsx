import { AppProps } from "next/app";
import Head from "next/head";
import NavBarAndFooter from "../components/NavBarAndFooter";
import { ThemeContextProvider } from "../utils/ThemeContext";
import { TokenContextProvider } from "../utils/TokenContext";
export default function app({Component,pageProps}:AppProps) {
        return(<>
            <Head>
                <title>Wordle</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <ThemeContextProvider>
                <TokenContextProvider>
                    <NavBarAndFooter>
                        <Component {...pageProps} />
                    </NavBarAndFooter>
                </TokenContextProvider>
            </ThemeContextProvider>
        </>)
}