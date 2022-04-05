export default interface Answer{
    letter:String,
    correct: Correct
}
enum Correct{
    Wrong,
    WrongPlace,
    Right
}