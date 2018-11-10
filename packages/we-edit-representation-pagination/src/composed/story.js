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
					const {width,height,x:x1}=piece.props
					pieces.push(
						<Group x={x1!=undefined ? x1 : x} key={i}>
							{piece}
						</Group>
					);
					state.x=x+(x1!=undefined ? 0 : width)
					return state
				},{pieces:[],x:0}).pieces
			}
			</Group>
		)
	}
}

class Inline{
	constructor(width,height){
		this.width=width
		this.availableHeight=height
		this.content=[]

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
		let avW=this.content.reduce((w,{props:{width}})=>w-width,this.width)
		if(avW>=min)
			return avW
		return 0
	}

	push(piece){
		this.content.push(piece)
	}

	isEmpty(){
		return false
	}
}

class TopAndBottom extends Inline{
	constructor(base,target){
		super(base.width)
		this.base=base

		const {height:targetHeight}=target.props
		let x=base.width-base.availableWidth()
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				get(){
					return this.base.height+targetHeight
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					return [
					...this.base.children,
					<Group x={x} y={-this.base.height} height={this.height} key={this.base.children.length}>{target}</Group>
					]
				}
			}
		})
	}

	availableWidth(min=0){
		return this.base.availableWidth(...arguments)
	}

	append(){
		this.base.append(...arguments)
	}
}

class Square extends Inline{
	constructor(base,target){
		super(base.width)
		this.content.push(base)
		this.target=target

		const {height:targetHeight,width:targetWidth}=this.target.props
		let x=this.width-base.availableWidth()
		let leftWidth=this.leftWidth=x, rightWidth=this.rightWidth=this.width-leftWidth-targetWidth
		let maxWidth=this.maxWidth=Math.max(leftWidth,rightWidth)

		Object.defineProperties(this,{
			height:{
				enumerable:true,
				get(){
					return Math.max(this.content.reduce((h,a)=>h+=a.height,0),targetHeight)
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					let y=this.height
					let lines=this.content.map((a,i)=>{
						let line=<Group key={i} y={-y}><Story>{a.children}</Story></Group>
						y-=a.height
						return line
					})
					return [
						<Group width={this.width} height={this.height} key={0}>{lines}</Group>,
						<Group x={x} width={targetWidth} height={this.height} key={1}>{target}</Group>
					]
				}
			}
		})
	}

	availableWidth(min){
		let current=this.content[this.content.length-1]
		let width=this.width-current.availableWidth()
		const {height:targetHeight,width:targetWidth}=this.target.props
		let t=0

		if(width<this.leftWidth){
			if((t=this.leftWidth-width)>=min)
				return t
		}else if(width<this.leftWidth+targetWidth){
			if(this.rightWidth>=min)
				return this.rightWidth
		}else if(width<this.width){
			if((t=this.width-width)>=min)
				return t
		}

		if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
			if((t=Math.min(this.leftWidth,this.rightWidth))>=min)
				return t
			else if((t=Math.max(this.leftWidth,this.rightWidth))>=min)
				return t
		}

		return 0
	}

	append(piece){
		let current=this.content[this.content.length-1]
		let x=this.width-current.availableWidth()
		let {width:contentWidth}=piece.props
		let {leftWidth,rightWidth,maxWidth}=this
		const {height:targetHeight,width:targetWidth}=this.target.props

		if(x<leftWidth){
			if(leftWidth-x>=contentWidth)
				return current.push(piece)
			else{
				current.push(<Group width={targetWidth+leftWidth-x} height={1} key="empty"/>)
				x=leftWidth+targetWidth
			}
		}

		if(x<leftWidth+targetWidth){
			current.push(<Group width={targetWidth+leftWidth-x} height={1}  key="empty"/>)
			x=leftWidth+targetWidth
		}

		if(x==leftWidth+targetWidth){
			if(rightWidth>=contentWidth)
				return current.push(piece)
			else if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
				this.content.push(new Inline(this.width))
				return this.append(piece)
			}else {
				throw new Error("should not be here")
			}
		}

		if(x<this.width){
			if(this.width-x>=contentWidth){
				return current.push(piece)
			}else if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
				this.content.push(new Inline(this.width))
				return this.append(piece)
			}else{
				throw new Error("should not be here")
			}
		}

		if(x>=this.width){
			if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
				this.content.push(new Inline(this.width))
				return this.append(piece)
			}else{
				throw new Error("should not be here")
			}
		}

		throw new Error("should not be here")
	}
}

Story.Info=Story.Inline=Inline
Story.TopAndBottom=TopAndBottom
Story.Square=Square
