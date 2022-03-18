export default interface WordleUser{
    _id?:string 
    UserName: String,
    Password:String,
    Admin:Boolean,
    Games?:[
        {
            _id:Number,
            CorrectWord:String,
            WordLength:Number,
            MaxTries:Number,
            WrongTries:[
                
            ],

        }
    ]
    
}