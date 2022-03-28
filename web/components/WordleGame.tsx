import WordleGameProps from "../model/WordleGameProps"
import WordleLineModel from "../model/WordleLineModel";
import WordleLine from "./WordleLine"
import ThemeContext from "../utils/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { json } from "stream/consumers";
import { Fragment } from "react";
import { randomInt } from "crypto";
import axios from "axios";
import GetToken from "../utils/GetToken";
import GuessResponse from "../model/GuessResponse";
export default function WordleGame(props:WordleGameProps) {
    let [themeContext,SetThemeContext] = useContext(ThemeContext);
    let [wordState,SetWordState] = useState("")
    let [game,SetGame] = useState([<Fragment key={"a"}></Fragment>]);
    let [propsState,SetProps]= useState(props)
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let [token,setToken] = useState<string>("")
    useEffect(() => {
        let data = GetToken()
        setToken(data);
    }, [])
    function emptyLine(length:Number):WordleLineModel{
        let wordleLine :WordleLineModel = {
            word :[]
        }
        for(let i=0;i<length;i++){
            wordleLine.word.push({correct:0,letter:""})
        }
        console.log(wordleLine)
        return wordleLine;
    }
    function CorrectWord(word:String){
        let chararray = word.split("")
        let words :WordleLineModel={word: chararray.map(x=>{
            let word = {letter:x,
                correct:2}
            return word
        })}
        return words
    }
    function GuessWord(word:String){
        let chararray = word.split("")
        let words :WordleLineModel={word: chararray.map(x=>{
            let word = {letter:x,
                correct:0}
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
    
    function CreateGameArray(input:WordleGameProps){
        let arr :JSX.Element[]= []
        let i =0
        for(;i<input.WordleGame.MaxTries-1;i++){
            if(input.WordleGame.WrongTries[i]){
                arr.push(
                        <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inword-block" key={i}>
                            <WordleLine length={input.WordleGame.WordLength} word={input.WordleGame.WrongTries[i]}></WordleLine>
                        </motion.div>
                    )
            }
            else if(input.WordleGame.CorrectWord.name!=""&&input.WordleGame.MaxTries==i){
                console.log(i)
                arr.push(
                        <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inword-block" key={i}>
                            <WordleLine length={input.WordleGame.WordLength} word={(CorrectWord(input.WordleGame.CorrectWord.name))} ></WordleLine>
                        </motion.div>
                    )
            }   
            else{
                arr.push(
                        <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inword-block" key={i}>
                            <WordleLine length={input.WordleGame.WordLength} word={emptyLine(input.WordleGame.WordLength)}></WordleLine>
                        </motion.div>
                    )
            }
        }
        if(input.WordleGame.Finished&& input.WordleGame.Won){
            //TODO: Implement call for modal when game is finished
            arr.push(
                <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block" key={i}>
                    <WordleLine length={input.WordleGame.WordLength} word={CorrectWord(input.WordleGame.CorrectWord.name)}/>
                </motion.div>
            )
        }
        else if(input.WordleGame.Finished){
            //TODO: Implement call for modal when game is finished
            arr.push(
                <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block" key={i}>
                    <WordleLine length={input.WordleGame.WordLength} word={input.WordleGame.WrongTries[i]}/>
                </motion.div>
            )
        }
        else{
            arr.push(
                <motion.div variants={WordleLineVariantFactory(i)} initial="initial" animate="animate" className="d-inline-block" key={i}>
                    <WordleLine length={input.WordleGame.WordLength} word={GuessWord(wordState)}/>
                </motion.div>
            )
        }
        return arr;
    }
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
        SetGame(CreateGameArray(props))
    },[])
    useEffect(()=>{
        SetGame(CreateGameArray(propsState))
    },[wordState])
    useEffect(()=>{
        SetGame(CreateGameArray(propsState))
    },[propsState])
    useEffect(()=>{
        SetProps(props)
        SetGame(CreateGameArray(props))
    },[props])
    return (
        <div className="h-100 d-flex flex-column justify-content-start align-items-center" >
            <div className={`w-75 d-flex flex-column  bg-${themeContext.PrimaryColor} text-white`}>
                {game}
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
                    onKeyPress={SetKeyPress}/>
            </div>
        </div>
    )
}