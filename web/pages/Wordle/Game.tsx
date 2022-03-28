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
    useEffect(() => {
        let data = GetToken()
        setToken(data);
    }, [])
    useEffect(()=>{
        if(token){
            getGameData()
        }
    },[token])
    function getGameData(){
        var config = {
            headers : { 
              'token': token, 
              'gameId': '1', 
              'id': '62402503d8cfc74363235150'
            }
          };
        axios.get('http://localhost:8000/wordle',config).then(data=>{

            let convertedData :WordleGameProps = {WordleGame:data.data,GameId:1,PlayerId:"62402503d8cfc74363235150"}
            wordleSetData(convertedData);
        },()=>{})
    
        
    }
    
    return(
        <>
            {wordleData?<WordleGame WordleGame={wordleData.WordleGame} GameId={wordleData.GameId} PlayerId={wordleData.PlayerId}/>:<LoadingGame/>}
        </>
    )
}