import React, {PureComponent} from "react"
import {connect, getUI} from "we-edit"
export default connect(state=>{
    const {draw}=getUI(state)
    return {draw}
})(class extends PureComponent{
    render(){
        const {props:{draw, width, height}}=this
        if(!draw)
            return null
        
        return <rect {...{width,height,fill:"transparent", ...draw}}/>
    }
})