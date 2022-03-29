import type { NextPage} from 'next'
import { useState } from 'react'
import { useEffect } from 'react'
import Router from 'next/router'
import SetToken from '../utils/SetToken'
import dynamic from 'next/dynamic'
import GetToken from '../utils/GetToken'
const Home: NextPage = () => {
  useEffect(()=>{
    GetToken()? 
    Router.push("/Wordle"):
    Router.push("/Login")
  },[]);
  return (<></>)
}

export default Home
