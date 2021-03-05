import React, {PureComponent} from "react"
import {connect, getUI} from "we-edit"
export default connect(state=>{
    const {draw}=getUI(state)
    return {draw}
})(class extends PureComponent{
    render(){
        const {props:{draw}}=this
        return <g>{draw}</g>
    }
})