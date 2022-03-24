export default interface WordleGameProps{
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