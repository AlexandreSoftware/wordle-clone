import WordleLineModel from "./WordleLineModel"

export default interface WordleGameProps{
    WordleGame:{
        CorrectWord: {
            name: String,
            relation: String
        },
        WordLength: Number,
        MaxTries: Number,
        Finished: Boolean,
        WrongTries: WordleLineModel[]
    }   
}
