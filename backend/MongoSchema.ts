import { Schema,Types} from "mongoose";
export default new Schema({
    UserName: String,
    Password:String,
    Games:[
        {
            _id:Types.ObjectId,
            CorrectWord:String,
            WordLength:Number,
            MaxTries:Number,
            WrongTries:[
                String
            ],

        }
    ]
    
})