import WordleNodeModel from "../model/WordleNodeModel";
import Styles from "../styles/WordleNode.module.css"
export default function WordleNode(props:WordleNodeModel) {
    return(
        <div className={` bg-${
            props.node.correct==0?
                "dark":
                props.node.correct==1?
                    "warning":
                    "success"
            } border-secondary border border-secondary 
             d-inline-flex 
             m-1 justify-content-center ${Styles.Node}`}>
                 {props.node.letter==""?" ":props.node.letter}
                 </div>
        
    )
}