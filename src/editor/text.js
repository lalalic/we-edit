import React,{PropTypes} from "react"
import {Text} from "../content"
import editable from "./editable"

import Group from "../composed/group"
import {Shape as CursorShape} from "./cursor"

let Super=editable(Text)
export default class extends Super{
    createComposedPiece(props){
		const {width, height, end, children, ...others}=props
		const {loc}=this.state
        let style=this.getFontStyle()

		let cursor=null
		if(typeof(loc)!='undefined'){
			if(end-children.length<loc && loc<=end){
				let locText=this.state.content.substring(end-children.length, loc)
				let composer=new this.constructor.WordWrapper(locText, style)
				let size=composer.next({width:Number.MAX_SAFE_INTEGER})
				cursor=<CursorShape key="cursorshape" ref={a=>this.updateCursor(a)} {...size} style={style}/>
			}
		}

        return (
			<Group width={width} height={height}>
				{cursor}
				<text {...others} onClick={e=>this.onClick(e,props)}>{children}</text>
			</Group>
		)
    }

    onClick(event, text){
		const {nativeEvent:{offsetX, offsetY}, target}=event
        let style=this.getFontStyle()
        let composer=new this.constructor.WordWrapper(text.children, style)
        let loc=composer.next({width:offsetX})||{end:0}
        let index=text.end-text.children.length+loc.end
		this.setState({loc:index}, ()=>this.reCompose())
    }

	updateCursor(ref){
		this.context.cursor().setState({target:this, shape:ref})
	}

	insert(str){
		const {content, loc}=this.state
		this.setState({content:content.splice(loc,0,str), loc:loc+str.length},e=>this.reCompose())
	}

	blur(){
		this.setState({loc:undefined})
	}

	static contextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.contextTypes)
}
