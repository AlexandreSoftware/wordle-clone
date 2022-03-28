import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";
import WordleGame from "../../components/WordleGame";
import WordleGameProps from "../../model/WordleGameProps";
import TokenContext from "../../utils/TokenContext";

export default  function Game(){    
    let sampleData :WordleGameProps={
        WordleGame: {
             CorrectWord:{
                name:"",
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
    }
    let [wordleData,wordleSetData] =useState(sampleData);
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
            <WordleGame WordleGame={wordleData.WordleGame}/>
        </>
    )
}