import WordleGame from "../../components/WordleGame";

export default function Game(){    
    return(
        <WordleGame WordleGame={
            {
                CorrectWord:{
                    name:"coat",
                    relation:"to test"
                },
                Finished:false,
                MaxTries:5,
                WordLength:4,
                WrongTries:[
                    {
                      line:[
                        {correct:0,letter:"b"},
                        {correct:2,letter:"o"},
                        {correct:2,letter:"a"},
                        {correct:2,letter:"t"}
                    ]},
                    {
                        line:[
                          {correct:0,letter:"j"},
                          {correct:2,letter:"o"},
                          {correct:1,letter:"k"},
                          {correct:0,letter:"e"}
                      ]},
                      {
                        line:[
                          {correct:0,letter:"l"},
                          {correct:2,letter:"o"},
                          {correct:2,letter:"a"},
                          {correct:0,letter:"d"}
                      ]},
                      {
                        line:[
                          {correct:2,letter:"c"},
                          {correct:2,letter:"o"},
                          {correct:2,letter:"a"},
                          {correct:2,letter:"t"}
                      ]},
                ]
            }
        }/>
    )
}