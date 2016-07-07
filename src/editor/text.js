import React,{PropTypes} from "react"
import {Text} from "../content"
import editable from "./editable"

let Super=editable(Text)
export default class extends Super{
    createComposedPiece(props){
        return <text {...props} onClick={e=>this.onClick(e,props)}/>
    }

    onClick(event, text){
		const {nativeEvent:{offsetX, offsetY}, target}=event
        let style=this.getFontStyle()
        let composer=new this.constructor.WordWrapper(this.state.content, style)
        let loc=composer.next({width:offsetX})||{end:0}
        let index=text.end-text.children.length+loc.end
		let cursor=this.context.cursor()
		
		let {x,y}=this.getAbsoluteXY(target)
		let x1=x+loc.width, y1=y
        cursor.setState({
			target:this, 
			loc: index,
			shape: (<line 
				x1={x1} 
				y1={y1} 
				x2={x1} 
				y2={y1-text.height} 
				strokeWidth={1} 
				stroke={style.color||"black"}
				/>)
		})
    }
	
	getAbsoluteXY(node){
		let x=0, y=0
		let viewportElement=node.viewportElement
		while(node && node!=viewportElement){
			if(node.nodeName=='g'){
				x+=parseFloat(node.getAttribute("x")||"0")
				y+=parseFloat(node.getAttribute("y")||"0")
			}
			node=node.parentNode
		}
		return {x,y}
	}
	
	static contextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.contextTypes)
}
