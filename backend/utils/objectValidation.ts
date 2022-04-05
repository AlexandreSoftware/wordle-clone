export function ValidateProp(prop,msg:string){
    if(prop)
        throw msg
    if(Array.isArray(prop) && prop.length === 0) 
        throw msg
    if(typeof prop === 'string' && !prop.trim())
        throw msg
    
}