import { Schema,Types} from "mongoose";
import WordleUser from "../WordleUser";
export default new Schema<WordleUser>({
    UserName:{type:String,required:true, unique:true},
    Password:{type:String,required:true},
    Admin:{type:Boolean,required:true},
    Games:[
        {
            _id:Number,
            CorrectWord:{
                name:String,
                relation:String
            },
            WordLength:Number,
            MaxTries:Number,
            Finished:Boolean,
            WrongTries:[{
                word:[{
                    letter:String,
                    correct:Number,
                    _id:false
                }],
                _id:false
              }],

        }
    ]
    
})