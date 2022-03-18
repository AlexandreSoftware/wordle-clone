import WordsJson from "./ReadJson"
export async function GetWords(length:number){
    const jsonresponse = await getRandomWordFromDictionary(length)
    console.log(jsonresponse)
    return await jsonresponse;
}
async function getRandomWordFromDictionary(length:number){
    const index = Math.floor(WordsJson.length * Math.random())
    const word = WordsJson[index]
    return {word,index};
}
export async function ValidateWord(word:string){
    console.log(!!WordsJson.find(x=>x.name==word))
    return !!WordsJson.find(x=>x.name==word)? true:false;   
}