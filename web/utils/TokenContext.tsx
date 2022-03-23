import React, { useState } from 'react';

type ITokenContext = [String, React.Dispatch<React.SetStateAction<string>>];

const TokenContext = React.createContext<ITokenContext>(["", () => null])

export default TokenContext

export const TokenContextProvider = (props:any)=>{
  const [colors,setColors] = useState("")
  return <TokenContext.Provider value={[colors, setColors]}>{props.children}</TokenContext.Provider>;
}