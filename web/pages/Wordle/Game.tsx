import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";
import WordleGame from "../../components/WordleGame/WordleGame";
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
              'gameId': 9, 
              'id': '6241e9c326739ea4a115c72d'
            }
          };
        axios.get('http://localhost:8000/wordle',config).then(data=>{

            let convertedData :WordleGameProps = {WordleGame:data.data,GameId:9,PlayerId:"6241e9c326739ea4a115c72d",getGameData:getGameData}
            wordleSetData(convertedData);
        },()=>{})
    
        
    }
    
    return(
        <>
            {wordleData?<WordleGame WordleGame={wordleData.WordleGame} GameId={wordleData.GameId} PlayerId={wordleData.PlayerId} getGameData={getGameData}/>:<LoadingGame/>}
        </>
    )
}