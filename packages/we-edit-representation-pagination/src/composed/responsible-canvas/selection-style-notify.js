import React, {Component} from "react"
import {connect, getStatistics} from "we-edit"
export default connect(state=>{
    const selection=state.get('selection').hashCode()
    const {composerID}=getStatistics(state)
    return {selection, composerID}
})(class extends Component{
    static displayName="SelectionStyleNotify"

    shouldComponentUpdate({selection,composerID}){
        return !!(composerID && (this.props.selection!=selection || composerID!=this.props.composerID))
    }

    render(){
        return null
    }

    componentDidUpdate(){
        this.props.updateSelectionStyle()
    }
})