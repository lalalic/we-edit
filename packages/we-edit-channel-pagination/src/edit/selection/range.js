import React, {Component} from "react"
import PropTypes from "prop-types"

import offset from "mouse-event-offset"
import getClientRect from "we-edit/tools/get-client-rect"

import Movable from "./movable"

export default class Range extends Component{
	static displayName="range"
    render(){
        const {path, onMove, children}=this.props
        return (
            <Movable onMove={onMove}>
				<g onClick={this.click.bind(this)}>
                	{children}
				</g>
            </Movable>
        )
    }

    click(e){
        let path=e.target

        let [x,y]=offset(e,path)
        let o=getClientRect(path)
        x+=o.left
        y+=o.top

        path.setAttribute("d","")

		//trick: infinite loop without setTimeout
		setTimeout(()=>{
			let  found=document.elementFromPoint(x,y)
			found.dispatchEvent(new MouseEvent("click",{
				clientX:x,clientY:y,
				view:window,
				bubbles:true,
				cancelable:false
			}))
		},1)

		e.stopPropagation()
    }
}
