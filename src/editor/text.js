import React,{PropTypes} from "react"
import {Text} from "../content"
import editable from "./editable"

import Group from "../composed/group"

let Super=editable(Text)
export default class extends Super{
    createComposedPiece(props){
		const {width, height, end, children}=props
		const {loc}=this.state
		let cursor=null
		if(typeof(loc)!='undefined'){
			if(end-children.length<loc && loc<end){
				let style=this.getFontStyle()
				let locText=children.substring(end-children.length, loc)
				let composer=new this.constructor.WordWrapper(locText, style)
				let {width,height}=composer.next({width:Number.MAX_SAFE_INTEGER})
				cursor=(<Cursor><Group x={width} y={height}><line 
					x1={0} 
					y1={0} 
					x2={0} 
					y2={-height} 
					strokeWidth={1} 
					stroke={style.color||"black"}
					/></Group></Cursor>)
			}
		}
		return (
			<Group width={width} height={height}>
				{cursor}
				<text {...props} onClick={e=>this.onClick(e,props)}/>
			</Group>
		)
    }

    onClick(event, text){
		const {nativeEvent:{offsetX, offsetY}, target}=event
        let style=this.getFontStyle()
        let composer=new this.constructor.WordWrapper(this.state.content, style)
        let loc=composer.next({width:offsetX})||{end:0}
        let index=text.end-text.children.length+loc.end
		let cursor=this.context.cursor()

        cursor.setState({target:this, loc: index})
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
	
	insert(loc, str){
		const {content}=this.state
		this.setState({content:content.splice(loc,0,str), loc},e=>this.reCompose())
	}
	
	blur(){
		this.setState({loc:undefined})
	}
	
	static contextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.contextTypes)
}
