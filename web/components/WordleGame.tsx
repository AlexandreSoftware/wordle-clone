import WordleGameProps from "../model/WordleGameProps"
import WordleLineModel from "../model/WordleLineModel";
import WordleLine from "./WordleLine"
import ThemeContext from "../utils/ThemeContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function WordleGame(props:WordleGameProps) {
    let [themeContext,SetThemeContext] = useContext(ThemeContext);
    function emptyLine(length:Number):WordleLineModel{
        let wordleLine :WordleLineModel = {
            line :[]
        }
        for(let i=0;i<length;i++){
            wordleLine.line.push({correct:0,letter:""})
        }
        return wordleLine;
    }
    function CorrectWord(word:String){
        let chararray = word.split("")
        let words :WordleLineModel={line: chararray.map(x=>{
            let word = {letter:x,
                correct:2}
            return word
        })}
        return words
    }
    function WordleLineVariantFactory(index:number){
        let WordleLineVariant={
            initial:{
                x: index%2==0?"-100vw":"100vw"
            },
            animate:{
                x:0,
                transition:{
                    duration:0.5,
                    type:"Tween"
                }
            }
        }
        return WordleLineVariant
    }
    
    function CreateGameArray(){
        let arr :JSX.Element[]= []
        let i =0
        for(;i< props.WordleGame.MaxTries;i++){
            if(props.WordleGame.WrongTries[i]){
                arr.push(<motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block">
                     <WordleLine length={props.WordleGame.WordLength} word={props.WordleGame.WrongTries[i]}></WordleLine>
                    </motion.div>)
            }
            else{
                arr.push(<motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block">
                            <WordleLine length={props.WordleGame.WordLength} word={emptyLine(props.WordleGame.WordLength)}></WordleLine>
                        </motion.div>)
            }

        }
        arr.push(<motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block">
                 <WordleLine length={props.WordleGame.WordLength} word={CorrectWord(props.WordleGame.CorrectWord.name)}></WordleLine>
                </motion.div>)
        return arr;
    }
    let onChange = (input) => {
        console.log("Input changed", input);
    }
    
    let onKeyPress = (button) => {
        console.log("Button pressed", button);
    }
    return (
        <div className="h-100 d-flex flex-column justify-content-start align-items-center">
            <div className={`w-75 d-flex flex-column  bg-${themeContext.PrimaryColor} text-white`}>
                {
                    CreateGameArray()
                }
                    <Keyboard 
                    layout={{default : [
                            'q w e r t y u i o p {bksp}',
                            ' a s d f g h j k l {enter} ',
                            '  z x c v b n m  ',
                            ' {space} '
                        ]}}
                    buttonTheme={ [
                        {
                            class: "invisible",
                            buttons: " "
                        }]}    
                    theme={`bg-${themeContext.PrimaryColor} react-simple-keyboard simple-keyboard hg-theme-default hg-layout-default text-dark`}
                    onChange={onChange}
                    onKeyPress={onKeyPress} />
            </div>
        </div>
    )
}