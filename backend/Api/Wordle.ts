import { Request,Response } from "express"
import bcrypt from "bcrypt";
import mongo, { PromiseProvider } from "mongoose";
import {GetWords,ValidateWord} from "../utils/DictionaryApi";
import WordleUser from "../model/WordleUser";
import Game from "../model/Game";
import Answer from "../model/Answer";
import CorrectWord from "../model/CorrectWord"
export async function WordleTryQuestion(req:Request,res:Response,next){
    let bodyvalues = GetDefaultValuesGuess(req.body)
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    let response = await db.findOne({UserName: req.body.UserName})
    let game = response?.Games?.find(x=>+x._id==bodyvalues.Id);
    if(ValidateWordLength(bodyvalues.Guess,game?.CorrectWord.word.name.length!)){
        if(await ValidateWord(bodyvalues.Guess)){
            if(game?.CorrectWord.word.name == bodyvalues.Guess){
                res.send([...game?.CorrectWord.word.name].map(x=>{return { letter:x,correct:2}}))
            }
            else{
                res.send(SortWords(bodyvalues.Guess,game?.CorrectWord.word.name!))
            }
        }
        else{
            res.send("Incorrect Word")
        }
    }
    else{
        res.send(`Incorrect Length, correct Length is ${game?.CorrectWord.word.name.length}`)
    }
}
export async function InsertWordleGame(req:Request,res:Response,next){
    let bodyvalues = GetDefaultValuesInsert(req.body)
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    let response = await db.findOne({UserName: req.body.UserName})
    const correctWord :CorrectWord= await GetWords(req.body.WordLength)
    let game :Game = { 
        _id:response?.Games?.length!,
        CorrectWord:correctWord,
        MaxTries : bodyvalues.MaxTries,
        WordLength : bodyvalues.WordLength,
        WrongTries : [],
        finished:false
    }
    response?.Games?.push(game);
    response?.save();
    res.send(game)
}
function GetDefaultValuesGuess(props){
    let newvalues= {Id:0,Guess:""};
    newvalues.Id = props.Id ? props.Id: 0 ;
    newvalues.Guess = props.Guess ? props.Guess: "" ;
    return newvalues
}
function GetDefaultValuesInsert(props){
    let newvalues= {WordLength:0,UserName:"",MaxTries:0,Id:0};
    newvalues.WordLength = props.WordLength ? props.WordLength: 5 ;
    newvalues.UserName = props.UserName ? props.UserName : "test"; 
    newvalues.MaxTries = props.MaxTries ? props.MaxTries : 5; 
    newvalues.Id = props.Id ? props.Id: 0 ;
    return newvalues
}
function SortWords(phrase: String,correctPhrase:String){
    let unsortedPhrase= [...phrase];
    let unsortedCorrectPhrase = [...correctPhrase];
    return unsortedPhrase.map(char=>{
        if(unsortedCorrectPhrase.find(cchar=>cchar==char)){
            if(SameWordMatchingIndex(unsortedPhrase,unsortedCorrectPhrase)){
                return { letter:char,correct:2};
            }
            return { letter:char,correct:1};
        }
        return { letter:char,correct:0};
    })
}
function SameWordMatchingIndex(phrase,correctPhrase){
    for(let c=0;c<phrase.length;c++){
        if(phrase[c]==correctPhrase[c]){
            return true;
        }
    }
    return false;
}
function RemoveFromArray(cchar, phrase){
    let arr :string[]= [];
    for(let c in phrase){
        if(c==phrase){
            cchar=null;
        }
        else{
            arr.push(c);
        }
    }
    return arr;
}
function ValidateWordLength(word:String,length:number){
    return word.length==length;
}