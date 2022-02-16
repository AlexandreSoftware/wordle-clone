import { ExpandedConnection } from "./ExpandedConnection";
import * as bodyparser from "body-parser"
import * as cors from "cors"
export default function (app:ExpandedConnection){
    app.use(bodyparser.json());
    console.log("iron")
    app.use(cors());
}