import {Cacheable} from "../../composable"
import editable from "./editable"
import Base from "../cell"
import {ReactQuery,connect,ACTION} from "we-edit"

export default class extends editable(Base){
    clearComposed(){
        this.computed.composed=[]
        super.clearComposed()
    }

    appendLastComposed(){
        this.computed.lastComposed=[]
        this.appendComposed(this.frame)
    }

    composeFrames(excludeTable=false){
        return !excludeTable ? [...super.composeFrames(...arguments),this.props.id] : super.composeFrames(...arguments)
    }
}
