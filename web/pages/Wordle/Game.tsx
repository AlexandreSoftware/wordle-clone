import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";
import WordleGame from "../../components/WordleGame";
import WordleGameProps from "../../model/WordleGameProps";
import TokenContext from "../../utils/TokenContext";
import LoadingGame from "../../components/LoadingGame"
export default  function Game(){    
    let [wordleData,wordleSetData] =useState<WordleGameProps>();
    function getData(){
        var config = {
            headers : { 
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWNrIGNvZmZlIiwiSWQiOiI2MjQwMjUwM2Q4Y2ZjNzQzNjMyMzUxNTAiLCJpYXQiOjE2NDgzNzA5NjF9.RKZVf1ZkAWFn0wYr6FT2nTvuuuRgG8JJxX1U0yA2F70', 
              'gameId': '0', 
              'id': '62402503d8cfc74363235150'
            }
          };
        axios.get('http://localhost:8000/wordle',config).then(data=>{
            let convertedData :WordleGameProps = {WordleGame:data.data}
            wordleSetData(convertedData);
        },()=>{})
    
        
    }
    useEffect(() => {
        getData()
    }, [])
    
    return(
        <>
            {wordleData?<WordleGame WordleGame={wordleData.WordleGame}/>:<LoadingGame/>}
        </>
    )
}