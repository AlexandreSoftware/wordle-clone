import e, { Request,Response } from "express"
import mongo from "mongoose";
import {GetWords,ValidateWord} from "../utils/DictionaryApi";
import WordleUser from "../model/WordleUser";
import Game from "../model/Game";
import CorrectWord from "../model/CorrectWord"
import WrongTry from "../model/WrongTry";
import WrongLetter from "../model/WrongLetter";
export async function WordleTryQuestion(req:Request,res:Response,next){
    let bodyvalues = GetDefaultValuesGuess(req.body)
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    let response = await db.findOne({UserName: req.body.UserName}).clone()
    let game = response?.Games?.find(x=>+x._id==bodyvalues.Id);
    if(game?.CorrectWord!= undefined){
        if(!game?.Finished){
            if(game.WrongTries.length<game.MaxTries){
                if(ValidateWordLength(bodyvalues.Guess,game?.CorrectWord.name.length)){
                    if(await ValidateWord(bodyvalues.Guess)){
                        if(game?.CorrectWord.name == bodyvalues.Guess){
                            game.Finished=true
                            response?.save()
                            res.send([...game?.CorrectWord.name].map(x=>{return { letter:x,correct:2}}))
                        }
                        else{
                            
                            let words :WrongTry= SortWords(bodyvalues.Guess,game?.CorrectWord.name!)
                            game?.WrongTries.push(words)
                            response?.save()
                            res.send(words)
                        }
                    }
                    else{
                        res.status(401).send("Incorrect Word")
                    }
                }
                else{
                    res.status(401).send(`Incorrect Length, correct Length is ${game?.CorrectWord.name.length}`)
                }
            }
            else{
                res.status(401).send("Game Finished: too many wrong tries")
            }
        }
        else{
            console.log(game)
            res.status(401).send("Game Finished: Correct Awnser")
        }
    }
    else{
        res.status(401).send("Game not found")
    }
}

export async function InsertWordleGame(req:Request,res:Response,next){
    let bodyvalues = GetDefaultValuesInsert(req.body)
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    let response = await db.findOne({UserName: req.body.UserName}).clone()
    if(response != null){
        const correctWord :CorrectWord= await GetWords(req.body.WordLength)
        let game :Game= { 
            _id:response?.Games?.length!,
            CorrectWord:correctWord,
            MaxTries : bodyvalues.MaxTries,
            WordLength : bodyvalues.WordLength,
            WrongTries : [],
            Finished:false
        }
        response?.Games?.push(game);
        response?.save();
        correctWord.name="";
        res.send(game)
    }
    else{
        res.status(401).send("ERROR")
    }
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
    let unsortedCorrectPhrase= [...correctPhrase];
    let word :WrongTry= { word:unsortedPhrase.map<WrongLetter>(char=>{
        if(unsortedCorrectPhrase.find(cchar=>cchar==char)){
            if(SameWordMatchingIndex(unsortedPhrase,unsortedCorrectPhrase)){
                return { letter:char,correct:2};
            }
            return { letter:char,correct:1};
        }
        return { letter:char,correct:0};
    })}
    return word
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