import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import Group from "./group"

export default class extends Component{
	static propTypes={
		width:PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}
	render(){
		return (<Group {...this.props} className="line"/>)
	}
	
	static Info=Line
}


class Line{
	constructor({width,height, blocks=[[0,width]]}){
		this.blocks=blocks.map(([x,width])=>new InlineBlock({x,width}))
		this.i=0
	}
	
	get current(){
		return this.blocks[this.i]
	}
	
	push(){
		this.current.push(...arguments)
	}
	
	availableWidth(min=0){
		let currentAvailable=this.current.availableWidth(min)
		if(currentAvailable>0)
			return currentAvailable
		const found=this.blocks.slice(this.i+1)
			.findIndex(a=>(currentAvailable=a.availableWidth(min))>0)
		if(found)
			this.i=found
		return currentAvailable
	}
	
	isEmpty(){
		return this.blocks[0].isEmpty()
	}
}

class InlineBlock{
	constructor({x,width,}){
		this.x=x
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
	
	push(a){
		this.content.push(a)
	}
	
	isEmpty(){
		return this.content.length==0
	}
}

class Placeholder{
	constructor({x,width,}){
		this.x=x
		this.width=width
	}
	
	availableWidth(){
		return 0
	}
	
	append(){
		throw new Error("can't append")
	}
	
	isEmpty(){
		return false
	}
}