import React, {Component,PropTypes} from "react"

export default class Overlay extends Component{
    static contextTypes={
		docId: PropTypes.string
	}

    render(){
        let {docId}=this.context
        let svg=document.querySelector(`#${docId} svg`)
        let {width,height}=svg.viewBox.baseVal

        let props={x:0,y:0,width,height,fill:"transparent"}
        let {children,...others}=this.props
        return (
            <g>
                {children}
                <rect {...props} {...others}/>
            </g>
        )
    }
}
