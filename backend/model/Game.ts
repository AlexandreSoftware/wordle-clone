export default interface Game{
    _id:number,
    CorrectWord:String,
    WordLength:Number,
    MaxTries:Number,
    WrongTries:[
        
    ],
    finished:Boolean
}