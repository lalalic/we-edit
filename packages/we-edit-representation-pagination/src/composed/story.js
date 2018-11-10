import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"

export default class Story extends Component{
	render(){
		const {children}=this.props
		const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
		const descent=children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)

		return (
			<Group y={height-descent}>
			{
				children.reduce((state,piece,i)=>{
					const {pieces,x}=state
					const {width,x:x1}=piece.props
					pieces.push(
						<Group x={x1!=undefined ? x1 : x} key={i}>
							{piece}
						</Group>
					)
					state.x=(x1!=undefined ? x1 : state.x)+width
					return state
				},{pieces:[],x:0}).pieces
			}
			</Group>
		)
	}

	static Info=class{
		constructor({width,height,blocks=[]}){
			this.width=width
			this.availableHeight=height
			this.content=[]
			this.blocks=blocks.map(({x,width})=><Group {...{x,width,height:0}}/>)

			Object.defineProperties(this,{
				height:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
					}
				},
				children:{
					enumerable:true,
					configurable:true,
					get(){
						return this.content
					}
				}
			})
		}

		availableWidth(min=0){
			this.blocks=this.blocks.map((a,i)=>{
				if((this.currentX+min)>a.props.x){
					this.content.push(a)
					this.blocks[i]=null
				}else{
					return a
				}
			}).filter(a=>!!a)

			let avW=this.width-this.currentX
			if(avW>=min)
				return avW
			return 0
		}

		push(piece){
			if(piece.props.x!=undefined){
				if(piece.props.x<this.currentX){
					const pops=[]
					while(piece.props.x<this.currentX){
						pops.unshift(this.content.pop())
					}
					this.content.push(piece)
					this.content.splice(this.content.length,0,...pops)
				}else{
					this.content.push(piece)
				}
			}else{
				this.content.push(piece)
			}
		}

		commit(){
			this.blocks.forEach(a=>this.content.push(a))
			this.blocks=[]
		}

		isEmpty(){
			return !!this.content.find(({props:{x}})=>x!=undefined)
		}

		get currentX(){
			return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
		}
	}
}
