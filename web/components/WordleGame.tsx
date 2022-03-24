import WordleGameProps from "../model/WordleGameProps"
import WordleLineModel from "../model/WordleLineModel";
import WordleLine from "./WordleLine"
import ThemeContext from "../utils/ThemeContext";
import { useContext } from "react";
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
    function CreateGameArray(){
        let arr :JSX.Element[]= []
        for(let i =0;i< props.WordleGame.MaxTries;i++){
            if(props.WordleGame.WrongTries[i]){
                arr.push(<WordleLine length={props.WordleGame.WordLength} word={props.WordleGame.WrongTries[i]}></WordleLine>)
            }
            else{
                arr.push(<WordleLine length={props.WordleGame.WordLength} word={emptyLine(props.WordleGame.WordLength)}></WordleLine>)
            }

        }
        arr.push(<WordleLine length={props.WordleGame.WordLength} word={CorrectWord(props.WordleGame.CorrectWord.name)}></WordleLine>)
        return arr;
    }
    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center overflow-auto">
            <div className={`w-75 d-flex flex-column overflow-auto bg-${themeContext.PrimaryColor} text-white`}>
                {
                    CreateGameArray()
                }
            </div>
        </div>
    )
}