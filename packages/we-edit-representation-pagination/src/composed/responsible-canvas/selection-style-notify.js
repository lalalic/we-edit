import React, {Component} from "react"
import {connect, getStatistics} from "we-edit"
export default connect(state=>{
    const selection=state.get('selection').hashCode()
    const {composerID}=getStatistics(state)
    return {selection, composerID}
})(class extends Component{
    static displayName="SelectionStyleNotify"

    shouldComponentUpdate({selection,composerID, hash}){
        return !!(composerID && composerID.startsWith(hash+'') && (this.props.selection!=selection || composerID!=this.props.composerID))
    }

    render(){
        return null
    }

    componentDidUpdate(){
        this.props.notify()
    }
})
/*
{
  type: 'we-edit/selection/SELECTED',
  payload: {
    start: {
      id: '338{ppt/slides/slide1.xml}',
      at: 67
    },
    end: {
      id: '338{ppt/slides/slide1.xml}',
      at: 67
    },
    page: 0
  }
}

{
    type:"we-edit/text/TYPE",
    payload:'k'
}
*/