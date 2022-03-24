import WordleGame from "../../components/WordleGame";

export default function Game(){    
    return(
        <WordleGame WordleGame={
            {
                CorrectWord:{
                    name:"test",
                    relation:"to test"
                },
                Finished:false,
                MaxTries:5,
                WordLength:4,
                WrongTries:[
                    
                ]
            }
        }/>
    )
}