import WordleGameProps from "../../model/WordleGameProps"
import WordleLineModel from "../../model/WordleLineModel";
import WordleLine from "../WordleLine"
import ThemeContext from "../../utils/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { json } from "stream/consumers";
import { Fragment } from "react";
import { randomInt } from "crypto";
import axios from "axios";
import GetToken from "../../utils/GetToken";
import GuessResponse from "../../model/GuessResponse";
import { CreateGameArray,GenerateKeyboard, GuessWord } from "./WordleGameDraw";
export default function WordleGame(props:WordleGameProps) {
    let [wordState,SetWordState] = useState("")
    let [game,SetGame] = useState([<Fragment key={"a"}></Fragment>]);
    let [propsState,SetProps]= useState(props)
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let [token,setToken] = useState<string>()
    let [themeContext,SetThemeContext] = useContext(ThemeContext);

    useEffect(() => {
        let data = GetToken()
        setToken(data);
    }, [])
    
    let SetKeyPress = (input) => {
        if(input == '{bksp}'){
            SetWordState(wordState.slice(0, wordState.length - 1))
        }
        else if(input =='{enter}'){
            Guess(wordState)
            SetWordState("")
        }
        else if(wordState.length!=propsState.WordleGame.WordLength&&input !='{enter}'){
            console.log("passed")
            console.log(wordState+input)
            SetWordState(wordState+input)
        }
        
    }
    global.onkeydown = (event)=>{
        if(event.key=='Backspace')
            SetKeyPress("{bksp}")
        else if(event.key=="Enter"){
            SetKeyPress("{enter}")
        }
        else if(alphabet.find(x=>x==event.key)){
            SetKeyPress(event.key)
        }
    }
    //i wish i just used reduce but typescript didnt think reduce to boolean would be apropriate, my head hurts, this is  the easier solution
    let isFinished = (word:GuessResponse)=>{
        return word.finished;
    }
    async function GuessRequest(guess:string){
        var config = { 
            "token":token,
            "gameid":props.GameId,
            "id":props.PlayerId,
            "Guess":guess
          };
        return await axios.post('http://localhost:8000/wordle/guess',config)
    
        
    }
    function pushSkeleton(word:string){
        propsState.WordleGame.WrongTries.push({
            Word:word.split("").map(element => {
                return {letter:element,correct:0}
            })});

    }
    async function Guess(word:string){
        //TODO: this is the money shot, this method calls the api and does the guess
        //TODO: implement notification if the word is not the correct length
        if(word.length == propsState.WordleGame.WordLength){
            pushSkeleton(word)
            SetProps(propsState)
            SetGame(game)
            try{
                let result = await GuessRequest(word)
                if(result.data &&result.data.word){
                    let convertedres : GuessResponse = result.data
                    propsState.WordleGame.WrongTries.pop()
                    console.log(propsState)
                    if(isFinished(convertedres)){
                        if(convertedres.won){
                            propsState.WordleGame.CorrectWord.name=word
                        }
                        else{
                            //TODO:Get the correct word and call the modal for failure 
                            propsState.WordleGame.WrongTries.push({Word:convertedres.word})
                            propsState.WordleGame.CorrectWord.name="WRONG AWNSER, GAME FINISHED"
                            props.getGameData()
                        }
                        propsState.WordleGame.Won=propsState.WordleGame.Won
                        propsState.WordleGame.Finished = true
                    }
                    else{
                        propsState.WordleGame.WrongTries.push({Word:convertedres.word})
                    }
                    SetWordState("")
                }       
                SetProps(propsState)
                SetGame(CreateGameArray(props,""))
            }
            catch(e){
                propsState.WordleGame.WrongTries.pop()
                console.log(e)
            }
        }
        else{
            //TODO: call the modal for the wrong question and get any other errors            
        }
        
    }
    useEffect(()=>{
        console.log("words")
        console.log(wordState)
        SetGame(CreateGameArray(propsState,wordState))
    },[wordState])
    useEffect(()=>{
        SetGame(CreateGameArray(propsState,wordState))
    },[propsState])
    useEffect(()=>{
        SetGame(CreateGameArray(props,wordState))
        SetProps(props)
    },[props])
    return (
        <div className="h-100 d-flex flex-column justify-content-start align-items-center" >
            <div className={`w-75 d-flex flex-column  bg-${themeContext.PrimaryColor} text-white`}>
                {propsState.WordleGame.CorrectWord.name}
                <h1 className="text-center">{propsState.WordleGame.CorrectWord.relation}</h1>
                {game}
                {GenerateKeyboard(SetKeyPress)}
            </div>
        </div>
    )
}