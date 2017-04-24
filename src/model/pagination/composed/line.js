import React, {PureComponent as Component, PropTypes} from "react"
import Group from "./group"

export const Line=({children})=>{
	const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
	const descent=children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)
	
	return (
		<Group y={height-descent} className="line">
		{
			children.reduce((state,piece,i)=>{
				const {pieces,x}=state
				const {width,height}=piece.props
				pieces.push(
					<Group x={x} key={i}>
						{piece}
					</Group>
				);
				state.x=x+width
				return state
			},{pieces:[],x:0}).pieces
		}
		</Group>
	)
}

export default Line

class Inline{
	constructor(width){
		this.width=width
		this.content=[]
		
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
				}
			},
			availableWidth:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content.reduce((w,{props:{width}})=>w-width,this.width)
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
	
	push(piece){
		const {mode:wrap}=piece.props.wrap||{}
		switch(wrap){
		case "TopAndBottom":
			if(this instanceof TopAndBottom)
				this.append(piece)
			else
				return new TopAndBottom(this,piece)
		break
		case "Square":
		case "Tight":
		case "Through":
			if(this instanceof Square)
				this.append(piece)
			else
				return new Square(this,piece)
		break
		default:
			this.append(piece)
		}
		
		return this
	}
	
	append(){
		this.content.push(...arguments)
	}
}

class TopAndBottom extends Inline{
	constructor(base,target){
		super(base.width)
		this.base=base
		
		const {height:targetHeight}=target.props
		let x=this.width-this.base.availableWidth
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				get(){
					return this.base.height+targetHeight
				}
			},
			availableWidth:{
				enumerable:true,
				get(){
					return this.base.availableWidth
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					return [...this.content,<Group x={x} y={-this.base.height}>{target}</Group>]
				}
			}
		})
	}
	
	append(){
		this.base.append(...arguments)
	}
}

class Square extends Inline{

}

export const Info=Inline


