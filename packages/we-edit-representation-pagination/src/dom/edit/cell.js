import editable from "./editable"
import Base from "../cell"

export default class __$1 extends editable(Base){
    clearComposed(){
        this.computed.composed=[]
        super.clearComposed()
    }

    appendLastComposed(){
        this.computed.lastComposed=[]
        this.appendComposed(this.frame)
    }
}
