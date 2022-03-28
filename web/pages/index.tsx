import type { NextPage } from 'next'
import { useState } from 'react'
import { useEffect } from 'react'
import Router from 'next/router'
const Home: NextPage = () => {
  let [logged,SetLogged] = useState<boolean>()
  
  useEffect(()=>{
    let token = localStorage.getItem("token")
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
