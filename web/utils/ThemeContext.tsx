import React, { useState } from 'react';
type ITheme={
  PrimaryColor:String,
  SecondaryColor:String
}
type IThemeContext = [ITheme, React.Dispatch<React.SetStateAction<ITheme>>];

const ThemeContext = React.createContext<IThemeContext>([{PrimaryColor:"",SecondaryColor:""}, () => null])

export default ThemeContext

export const ThemeContextProvider = (props:any)=>{
  const [colors, setColors] = useState<ITheme>(
    {
      PrimaryColor:"dark",
      SecondaryColor:"white",
    })

  return <ThemeContext.Provider value={[colors, setColors]}>{props.children}</ThemeContext.Provider>;
}