import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Wordle from './Wordle'
import Login from './Login'
import SSRProvider from 'react-bootstrap/SSRProvider';
const Home: NextPage = () => {
  let [logged,islogged] = useState(false)
  return (
        <>
          <Head>
            <title>Wordle</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>
          <SSRProvider>
            {logged?<Wordle/>:<Login></Login>}
          </SSRProvider>
        </>

  )
}

export default Home
