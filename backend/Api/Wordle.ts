import { Request,Response } from "express"
import mongo from "mongoose";
import {GetWords,ValidateWord} from "../utils/DictionaryApi";
import WordleUser from "../model/WordleUser";
import Game from "../model/Game";
import CorrectWord from "../model/CorrectWord"
import WrongTry from "../model/WrongTry";
import WrongLetter from "../model/WrongLetter";
export async function WordleTryQuestion(req:Request,res:Response,next){
    let bodyvalues = {...req.body}
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    let response;
    if(bodyvalues.UserName){
        response = await db.findOne({UserName: bodyvalues.UserName}).clone()
    }
    else if(bodyvalues.id){
        response = await db.findOne({_id: bodyvalues.id}).clone()
    }

    let game : Game = response?.Games?.find(x=>+x._id==bodyvalues.gameid);
    if(game?.CorrectWord!= undefined){
        if(!game?.Finished&&!game.Won){
            if(game.WrongTries.length<=game.MaxTries){
                if(ValidateWordLength(bodyvalues.Guess,+game?.WordLength)){                   
                    if(await ValidateWord(bodyvalues.Guess)){
                        if(game?.CorrectWord.name == bodyvalues.Guess){
                            game.Finished=true
                            response?.save()
                            let result :WrongTry = {word:[...game?.CorrectWord.name].map(x=>{return { letter:x,correct:2}}),finished:true,won:true} ;
                            res.json(result)
                        }
                        else if(game?.WrongTries.length >= game?.MaxTries){
                            console.log("passed")
                            game.Finished=true;
                            game.Won=false
                            let words:WrongTry= SortWords(bodyvalues.Guess,game?.CorrectWord.name!,true)
                            game?.WrongTries.push(words)
                            response?.save()
                            res.json(words)
                        }
                        else{
                            
                            let words :WrongTry= SortWords(bodyvalues.Guess,game?.CorrectWord.name!,false)
                            game?.WrongTries.push(words)
                            response?.save()
                            res.json(words)
                        }
                    }
                    else{
                        res.status(401).send("Incorrect Word")
                    }
                }
                else{
                    res.status(401).send(`Incorrect Length, correct Length is ${game?.WordLength}`)
                }
            }
            else{
                res.status(401).send("Game Finished: too many wrong tries")
            }
        }
        else{
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
    let response = await db.findOne({UserName: bodyvalues.UserName}).clone()
    if(response != null){
        const correctWord :CorrectWord= await GetWords(bodyvalues.WordLength)
        let game :Game= { 
            _id:response?.Games?.length!,
            CorrectWord:correctWord,
            MaxTries : bodyvalues.MaxTries,
            WordLength : bodyvalues.WordLength,
            WrongTries : [],
            Finished:false,
            Won:false
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
export async function GetWordleGame(req:Request,res:Response,next){    
    const db : mongo.Model<WordleUser> = req.app["db"]; 
    if(ValidateSearch(req.headers)&&req.headers!=undefined){
        let result = await db.findOne({_id:req.headers.id})
        let game = result?.Games?.find(x=>x._id==+req.headers.gameid!)
        if(game&&!game?.Finished){
            game.CorrectWord.name=""
            res.json(game);
        }
        else if(game){
            res.json(game);
        }
        else{
            res.status(401).send("ERROR: Game not found")
        }
        
    }
    else{
        res.status(401).send("ERROR: Invalid props")
    }
}
function ValidateSearch(props){
    return props && props.id && props.gameid
}
function GetDefaultValuesInsert(props){
    let newvalues= {WordLength:0,UserName:"",MaxTries:0,Id:0};
    newvalues.WordLength = props.WordLength ? props.WordLength: 5 ;
    newvalues.UserName = props.UserName ? props.UserName : "test"; 
    newvalues.MaxTries = props.MaxTries ? props.MaxTries : 5; 
    newvalues.Id = props.Id ? props.Id: 0 ;
    return newvalues
}
function SortWords(phrase: String,correctPhrase:String,finished:boolean){
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
    }),finished,won:false}
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