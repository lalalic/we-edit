import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import Group from "./group"
import Text from "./text"

function isWhitespace(a){
	if(a.props.minWidth==0){
		while(a && a.props.className!="whitespace"){
			try{
				a=React.Children.only(a.props.children)
			}catch(e){
				return false
			}
		}
		return !!a
	}
	return false
}

export default class Story extends Component{
	render(){
		const {children, align="left"}=this.props
		const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
		const descent=children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)

		return (
			<Group y={height-descent}>
				{this[align]()}
			</Group>
		)
	}

	left(){
		return this.props.children.reduce((state,piece,key)=>{
			const {width,x:x1}=piece.props
			const x=x1!=undefined ? x1 : state.x
			state.pieces.push(React.cloneElement(piece,{x,key}))
			state.x=x+width
			return state
		},{pieces:[],x:0}).pieces
	}

	group(){
		return this.props.children
			.reduce((groups,a)=>{
				if(a.props.x!=undefined){
					groups.push({located:a,words:[]})
				}else{
					groups[groups.length-1].words.push(a)
				}
				return groups
			},[{words:[]}])
			.map(group=>{
				let i=group.words.length-
						Array.from(group.words)
							.reverse()
							.findIndex(a=>!isWhitespace(a))

				group.endingWhitespaces=group.words.slice(i)
				group.words=group.words.slice(0,i)
				return group
			})
	}

	groupRight(){
		return this.group().map((a,i,me)=>{
			if(me.length-1==i){
				delete a.located
			}else{
				a.located=me[i+1].located
			}
		})
	}

	right(){
		return this.group()
			.reduceRight((state, {located,words,endingWhitespaces})=>{
				const i=state.righted.length
				endingWhitespaces.reduce((x,whitespace)=>{
					state.righted.push(React.cloneElement(whitespace,{x}))
					return x+whitespace.props.width
				},state.x)

				words.reduceRight((x,word)=>{
					x=x-word.props.width
					state.righted.splice(i,0,React.cloneElement(word,{x}))
					return x
				},state.x)

				if(located){
					state.righted.splice(i,0,located)
					state.x=located.props.x
				}
				return state
			},{x:this.props.width,righted:[]}).righted
	}

	center(){
		const contentWidth=pieces=>pieces.reduce((w,a)=>w+a.props.width,0)

		return this.groupRight()
			.reduce((state, {located, words, endingWhitespaces})=>{
				const width=located.props.x-state.x
				state.centerized.push(
					<Group x={state.x+(width-contentWidth(words))/2} key={state.centerized.length}>
						{
							words.reduce((),{x:0,pieces:[]}).pieces
						}
					</Group>
				)
				const i=state.righted.length
				endingWhitespaces.reduce((x,whitespace)=>{
					state.righted.push(React.cloneElement(whitespace,{x}))
					return x+whitespace.props.width
				},state.x)

				words.reduceRight((x,word)=>{
					x=x-word.props.width
					state.righted.splice(i,0,React.cloneElement(word,{x}))
					return x
				},state.x)

				if(located){
					state.righted.splice(i,0,located)
					state.x=located.props.x
				}
				return state
			},{x:0, centerized:[]})

		const contentWidth=pieces=>pieces.reduce((w,a)=>w+a.props.width,0)
		const centerizeGroup=(state,destX)=>{
			if(state.pieces.length>0){
				const width=destX-state.x0
				state.centerized.push(
					<Group x={state.x0+(width-contentWidth(state.pieces))/2} key={state.centerized.length}>
						{[...state.pieces]}
					</Group>
				)
				state.pieces=[]
				state.x=0
			}
		}
		return this.props.children.reduce((state,piece,key)=>{
			if(piece.props.x!=undefined){
				centerizeGroup(state,piece.props.x)
				state.centerized.push(React.cloneElement(piece, {key:state.centerized.length}))
				state.x0=piece.props.x+piece.props.width
			}else{
				state.pieces.push(React.cloneElement(piece,{x:state.x,key:state.pieces.length}))
				state.x=state.x+piece.props.width
			}
			if(key==this.props.children.length-1){
				centerizeGroup(state,this.props.width)
			}
			return state
		},{pieces:[],x:0, centerized:[],x0:0}).centerized
	}

	justify(){
		const justify=(state, destX)=>{
			const whitespaces=state.whitespaces.reduce((sum,a)=>sum+(a||0) ,0)
			const width=destX-state.x0
			const whitespaceWidth=whitespaces>0 ? (width-state.contentWidth)/whitespaces : 0
			state.pieces.reduce((x,a,key)=>{
				if(!a) return x
				state.justified.push(React.cloneElement(a, {x,key}))
				return x+(state.whitespaces[key]>0 ? state.whitespaces[key]*whitespaceWidth : a.props.width)
			},state.x0)
			state.whitespaces=[]
			state.pieces=[]
			state.contentWidth=0
		}


		return this.props.children.reduce((state,piece,key)=>{
			if(piece.props.x!=undefined){
				justify(state,piece.props.x)
				state.justified.push(React.cloneElement(piece, {key}))
				state.x0=piece.props.x+piece.props.width
			}else{
				state.pieces[key]=piece
				if(isWhitespace(piece)){
					state.whitespaces[key]=1
				}else{
					state.contentWidth+=piece.props.width
				}
			}
			if(key==this.props.children.length-1){
				justify(state,this.props.width)
			}
			return state
		},{pieces:[], whitespaces:[],contentWidth:0,justified:[],x0:0}).justified
	}

	both(){
		return this.justify()
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
			if(min==0)
				return 1
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
