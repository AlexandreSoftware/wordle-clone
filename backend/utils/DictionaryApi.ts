import WordsJson from "./ReadJson"
export async function GetWords(length:number){
    const jsonresponse = await getRandomWordFromDictionary(length)
    return await jsonresponse;
}
async function getRandomWordFromDictionary(length:number){
    const index = Math.floor(WordsJson.length * Math.random())
    const word = WordsJson[index]
    return word;
}
export async function ValidateWord(word:string){
    return !!WordsJson.find(x=>x.name==word)? true:false;   
}