export default interface GuessResponse{
    word: Word[]
    finished:boolean,
    won:boolean

}
interface Word{
    letter:string,
    correct:number;
}