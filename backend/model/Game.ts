import CorrectWord from "./CorrectWord"
import WrongTry from "./WrongTry"
export default interface Game{
    _id:number,
    CorrectWord:CorrectWord,
    WordLength:Number,
    MaxTries:Number,
    WrongTries:WrongTry[],
    Finished:Boolean,
    Won:Boolean

}