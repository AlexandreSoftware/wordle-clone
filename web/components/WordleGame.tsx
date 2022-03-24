import { arrayBuffer } from "stream/consumers";
import WordleGameProps from "../model/WordleGameProps"
import WordleLine from "./WordleLine"

export default function WordleGame(props:WordleGameProps) {
    
    function CreateGameArray(){
        let arr :JSX.Element[]= []
        for(let i in props.WordleGame.MaxTries){
            arr.push(<WordleLine WordleGame={props.WordleGame}></WordleLine>)
        }
        return arr;
    }
    return (
        <>
            {
                CreateGameArray()
            }
        </>
    )
}