import CorrectWord from "./CorrectWord"
export default interface Game{
    _id:number,
    CorrectWord:CorrectWord,
    WordLength:Number,
    MaxTries:Number,
    WrongTries:[
        
    ],
    finished:Boolean
}