import fs from "fs"
let file = require("./thj3w-f0zmk")
let newfile : any[]= []
let words : any[] = []
let e
for(e in file){
    if(!words.find(x=>x==file[e].name)){
        newfile.push(file[e]);
        words.push(file[e].name)
    }
}
console.log(words)
fs.writeFileSync("./thj3w-f0zmk.json",JSON.stringify(newfile))