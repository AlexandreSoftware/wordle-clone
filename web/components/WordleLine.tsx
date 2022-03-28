import { motion } from "framer-motion";
import WordleLineProps from "../model/WordleLineProps";
import app from "../pages/_app";
import WordleNode from "./WordleNode";

export default function WordleLine(props:WordleLineProps) {
    
    let arr :JSX.Element[]= []
        for(let i =0;i<props.length;i++){
            if(props.word.word&&props.word.word[i]){
                arr.push(
                    <WordleNode node={{correct: props.word.word[i].correct , letter:props.word.word[i].letter}} key={i}/>
                )
            }
            else{
                arr.push(
                    <WordleNode node={{correct:0 , letter:""}} key={i}/>
                )
            }
        }
    return(<div className="text-center text-white  w-100">{arr}</div>
        )
}