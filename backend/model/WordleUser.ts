import CorrectWord from "./CorrectWord"
export default interface WordleUser{
    _id?:string 
    UserName: String,
    Password:String,
    Admin:Boolean,
    Games?:[
        {
            _id:Number,
            CorrectWord:CorrectWord,
            WordLength:Number,
            MaxTries:Number,
            WrongTries:[
                
            ],

        }
    ]
    
}