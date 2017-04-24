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
				const {width,height,x:x1}=piece.props
				pieces.push(
					<Group x={x1!=undefined ? 0 : x} key={i}>
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
		let x=base.width-base.availableWidth
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
					return [...this.base.children,<Group x={x} y={-this.base.height} height={this.height}>{target}</Group>]
				}
			}
		})
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
		let x=this.width-base.availableWidth
		let leftWidth=this.leftWidth=x, rightWidth=this.rightWidth=this.width-leftWidth-targetWidth
		let maxWidth=this.maxWidth=Math.max(leftWidth,rightWidth)

		Object.defineProperties(this,{
			height:{
				enumerable:true,
				get(){
					return Math.max(this.content.reduce((h,a)=>h+=a.height,0),targetHeight)
				}
			},
			availableWidth:{
				enumerable:true,
				get(){
					let current=this.content[this.content.length-1]
					let width=this.width-current.availableWidth
					if(width<leftWidth)
						return leftWidth-width
					else if(width<leftWidth+targetWidth)
						return rightWidth
					else if(width<this.width)
						return this.width-width
					else if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight)
						return rightWidth
					else
						return 0
				}
			},
			availableMaxWidth:{
				enumerable:true,
				get(){
					if(this.content.reduce((h,a)=>h+=a.height,0)>=targetHeight){
						let current=this.content[this.content.length-1]
						let width=this.width-current.availableWidth
						if(width<leftWidth)
							return Math.max(leftWidth-width,rightWidth)
						else if(width<leftWidth+targetWidth)
							return rightWidth
						else if(width<this.width)
							return this.width-width
						else
							return 0
					}else{
						return maxWidth
					}
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					let y=0
					let lines=this.content.map(a=>{
						let line=<Group y={y}>{a.children}</Group>
						y+=a.height
						return line
					})
					return [
						<Group width={this.width} height={this.height}>{lines}</Group>,
						<Group x={x} width={targetWidth} height={this.height}>{target}</Group>
					]
				}
			}
		})
	}

	append(piece){
		let current=this.content[this.content.length-1]
		let width=this.width-current.availableWidth
		let {width:contentWidth}=piece.props
		let {leftWidth,rightWidth,maxWidth}=this
		const {height:targetHeight,width:targetWidth}=this.target.props
		
		if(width<leftWidth){
			if(leftWidth-width>=contentWidth)
				return current.push(piece)
			else{
				current.push(<Group width={targetWidth+leftWidth-width} height={1}/>)
				width=leftWidth+targetWidth
			}
		}

		if(width<leftWidth+targetWidth){
			current.push(<Group width={targetWidth+leftWidth-width} height={1}/>)
			width=leftWidth+targetWidth
		}

		if(width==leftWidth+targetWidth){
			if(rightWidth<=contentWidth)
				return current.push(piece)
			else if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
				this.content.push(new Inline(this.width))
				return this.append(piece)
			}else {
				throw new Error("should not be here")
			}
		}

		if(width<this.width){
			if(this.width-width>=contentWidth){
				return current.push(piece)
			}else if(this.content.reduce((h,a)=>h+=a.height,0)<targetHeight){
				this.content.push(new Inline(this.width))
				return this.append(piece)
			}else{
				throw new Error("should not be here")
			}
		}

		if(width>=this.width){
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

export const Info=Inline
