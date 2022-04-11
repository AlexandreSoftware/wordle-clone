import {Request} from "express"
let fakedb = () : Request => {
    return new jest.mock("Request",)
}
describe("Wordle Unit Tests",
()=>{
    jest.fn(()=>{})
    it("should be created empty ",()=>{
        jest.fn()
    })

    it.todo("should not return name when queried");
})