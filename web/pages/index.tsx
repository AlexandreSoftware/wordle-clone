import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Wordle from './Wordle'
import Login from './Login'
import { useEffect } from 'react'
import Router from 'next/router'
const Home: NextPage = () => {
  let [logged,SetLogged] = useState(false)
  useEffect(()=>{
    localStorage.setItem("token","test")
    let token = localStorage.getItem("token")
    localStorage.removeItem("token")
    if(token){
      SetLogged(true)
    }
    else{
      SetLogged(false)
    }
  },[]);
  useEffect(()=>{
    logged? 
    Router.push("/Wordle"):
    Router.push("/Login")
  },[logged])
  return (<></>)
}

export default Home
