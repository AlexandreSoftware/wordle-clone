export default interface WordleLineProps{
    WordleGame:{
        CorrectWord: {
            name: String,
            relation: String
        },
        WordLength: Number,
        MaxTries: Number,
        Finished: Boolean,
        WrongTries: String[]
    }   
}