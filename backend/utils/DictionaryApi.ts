import axios from "axios"
export default async function getWords(length:number){
    const jsonresponse = await getFromDictionaryApi(length)
    return await parseJsonWord(jsonresponse);
}
async function getFromDictionaryApi(length:number){
    const config =  require("../config/config.json");
    const res = await axios.get(`${config.DictionaryApiString}/${length}`)
    return res;
}
async function parseJsonWord(jsonresponse){
    return  Object.keys(jsonresponse.data)[0]
}