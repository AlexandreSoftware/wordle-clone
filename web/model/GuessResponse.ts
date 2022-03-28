export default interface GuessResponse{
    word: Word[]
}
interface Word{
    letter:string,
    correct:number;
}