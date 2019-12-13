
import {editable} from "../../composable"
import Base from "../text"
export default class __$1 extends editable(Base){
    render(){
        if(this.text.length==0){
            this.appendComposed({
                ...this.defaultStyle,
                width:0,
                minWidth:0,
                "data-endat":0,
                children: ""
            })

            this.onAllChildrenComposed()
            return null
        }
        return super.render()
    }
}
