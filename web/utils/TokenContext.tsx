import React, { useEffect, useState } from 'react';


type ITokenContext = [String, React.Dispatch<React.SetStateAction<string>>];

const TokenContext = React.createContext<ITokenContext>(["", () => null])

export default TokenContext
export const TokenContextProvider = (props:any)=>{
  let storedToken = ""
  if(typeof window !== 'undefined' &&localStorage){
    storedToken = localStorage.getItem("token")!
  }
  const [token,setToken] = useState(storedToken)
  
  return <TokenContext.Provider value={[token, setToken]}>{props.children}</TokenContext.Provider>;
  
}