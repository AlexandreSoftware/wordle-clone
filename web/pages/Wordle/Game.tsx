import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";
import WordleGame from "../../components/WordleGame";
import WordleGameProps from "../../model/WordleGameProps";
import LoadingGame from "../../components/LoadingGame"
import GetToken from "../../utils/GetToken";
export default  function Game(){    
    let [wordleData,wordleSetData] =useState<WordleGameProps>();
    let [token,setToken] = useState<string>("")
    function getGameData(){
        var config = {
            headers : { 
              'token': token, 
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
        let data = GetToken()
        setToken(data);
    }, [])
    useEffect(()=>{
        if(token){
            getGameData()
        }
    },[token])
    
    return(
        <>
            {wordleData?<WordleGame WordleGame={wordleData.WordleGame}/>:<LoadingGame/>}
        </>
    )
}