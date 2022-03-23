import React, { useState } from 'react';
type IColors={
  PrimaryColor:String,
  SecondaryColor:String
}
type IColorsContext = [IColors, React.Dispatch<React.SetStateAction<IColors>>];

const ThemeContext = React.createContext<IColorsContext>([{PrimaryColor:"",SecondaryColor:""}, () => null])

export default ThemeContext

export const ThemeContextProvider = (props:any)=>{
  const [colors, setColors] = useState<IColors>(
    {
      PrimaryColor:"dark",
      SecondaryColor:"white",
    })

  return <ThemeContext.Provider value={[colors, setColors]}>{props.children}</ThemeContext.Provider>;
}