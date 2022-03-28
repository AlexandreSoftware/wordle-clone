import React, { useEffect, useState } from 'react';


type ITokenContext = [String, React.Dispatch<React.SetStateAction<string>>];

const TokenContext = React.createContext<ITokenContext>(["", () => null])

export default TokenContext
export const TokenContextProvider = (props:any)=>{
  const [token,setToken] = useState("")

  
  return <TokenContext.Provider value={[token, setToken]}>{props.children}</TokenContext.Provider>;
}