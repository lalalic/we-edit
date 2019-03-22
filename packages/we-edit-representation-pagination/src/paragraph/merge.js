import React, {Children,Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {ReactQuery} from "we-edit"
import {Group} from "../composed"


export default class Merge extends Component{
	render(){
		const {children,...props}=this.props
		return (
			<Group {...props}>
				{this.getMerged(children)}
			</Group>
		)
	}
	getMerged=memoize((children)=>{
		return React.Children.toArray(children)
		.reduce((state,piece,key)=>{
			const piecePath=path(piece)
			if(!piecePath.bText){
				state.mergeTrunk(key)
				state.pieces.push(React.cloneElement(piece,{x:state.x,key}))
				state.x+=piece.props.width
			}else{
				if(piecePath.join(",")==state.trunkPath){
					state.trunk.push(piece)
				}else {
					state.mergeTrunk(key)
					state.trunk.push(piece)
					state.trunkPath=piecePath.join(",")
				}
			}
			return state
		},{	pieces:[],
			x:0,
			trunk:[],
			trunkPath:null,
			mergeTrunk(key=-1){
				if(this.trunk.length==1){
					const piece=this.trunk[0]
					this.pieces.push(React.cloneElement(piece,{x:this.x,key}))
					this.x+=piece.props.width
				}else if(this.trunk.length>1){
					const extract=a=>path(a,b=>b).pop()
					const texts=this.trunk.map(extract)
					const props=texts.reduce((props,a)=>{
							props.width+=a.props.width
							props.children+=a.props.children
							return props
						},{
							width:0,
							children:"",
							"data-endat":texts[texts.length-1].props["data-endat"],
							className:undefined,minWidth:undefined
						})
					const parents=path(this.trunk[0],a=>a,a=>true).slice(0,-1)
					const merged=parents.reduceRight((child,a)=>React.cloneElement(a,{width:props.width},child),React.cloneElement(texts[0],props))
					this.pieces.push(React.cloneElement(merged,{x:this.x,key}))
					this.x+=props.width
				}
				this.trunk=[]
				this.trunkPath=null
				return this
			}
		})
		.mergeTrunk()
		.pieces
	})
}


function path(a,info=a=>a.props["data-content"],test=a=>!!a.props["data-content"],ids=[]){
	if(React.isValidElement(a)){
		if(test(a)){
			ids.push(info(a))
			ids.bText=a.props["data-type"]=="text"
		}
		if(React.isValidElement(a.props.children)){
			path(React.Children.only(a.props.children),info,test,ids)
		}
	}
	return ids
}
