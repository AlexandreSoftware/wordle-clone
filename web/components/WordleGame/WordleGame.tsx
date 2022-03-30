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
import { CreateGameArray,GenerateKeyboard } from "./WordleGameDraw";
export default function WordleGame(props:WordleGameProps) {
    let [wordState,SetWordState] = useState("")
    let [game,SetGame] = useState([<Fragment key={"a"}></Fragment>]);
    let [propsState,SetProps]= useState(props)
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let [token,setToken] = useState<string>("")
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
        else if(wordState.length!=propsState.WordleGame.WordLength){
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
    let isCorrectWord = (word:GuessResponse)=>{
        let val :boolean=true;
        for (let x=0;x<word.word.length;x++){
            val=word.word[x].correct==2&&val
        }
        return val;
    }
    async function GuessRequest(guess:string){
        var config = { 
            "token":token,
            "gameid":props.GameId,
            "id":props.PlayerId,
            "Guess":guess
          };
          console.log(guess)
        return await axios.post('http://localhost:8000/wordle/guess',config)
    
        
    }
    function pushSkeleton(word:string){
        propsState.WordleGame.WrongTries.push({
            word:word.split("").map(element => {
                return {letter:element,correct:0}
            })});

    }
    async function Guess(word:string){
        //TODO: this is the money shot, this method calls the api and does the guess
        //TODO: implement notification if the word is not the correct length
        if(word.length == propsState.WordleGame.WordLength){
            pushSkeleton(word)
            SetProps(propsState)
            try{
                let result = await GuessRequest(word)
                if(result.data &&result.data.word){
                    let convertedres : GuessResponse = result.data
                    propsState.WordleGame.WrongTries.pop()
                    if(isCorrectWord(convertedres)){
                        propsState.WordleGame.CorrectWord.name=word
                    }
                    else{
                        propsState.WordleGame.WrongTries.push({word:convertedres.word})
                    }
                }

            }
            catch(e){
                propsState.WordleGame.WrongTries.pop()
                console.log(e)
            }
            SetProps(propsState)
            //for some reason settingprops is not updating state, this should update state accordingly
            SetWordState(wordState)
        }
        else{
            
        }
    }
    useEffect(()=>{
        SetGame(CreateGameArray(props,wordState))
    },[])
    useEffect(()=>{
        SetGame(CreateGameArray(propsState,wordState))
    },[wordState])
    useEffect(()=>{
        SetGame(CreateGameArray(propsState,wordState))
    },[propsState])
    useEffect(()=>{
        SetProps(props)
        SetGame(CreateGameArray(props,wordState))
    },[props])
    return (
        <div className="h-100 d-flex flex-column justify-content-start align-items-center" >
            <div className={`w-75 d-flex flex-column  bg-${themeContext.PrimaryColor} text-white`}>
                {game}
                {GenerateKeyboard(SetKeyPress)}
            </div>
        </div>
    )
}