import { motion } from "framer-motion";
import WordleLineProps from "../model/WordleLineProps";
import app from "../pages/_app";
import WordleNode from "./WordleNode";

export default function WordleLine(props:WordleLineProps) {
    
    let arr :JSX.Element[]= []
        for(let i =0;i< +props.length;i++){
            if(props.word.line[i]){
                arr.push(
                    <WordleNode node={{correct: props.word.line[i].correct , letter:props.word.line[i].letter}}/>
                )
            }
            else{
                arr.push(
                    <WordleNode node={{correct:0 , letter:" "}}/>
                )
            }
        }
    return(<div className="text-center text-white  w-100">{arr}</div>
        )
}