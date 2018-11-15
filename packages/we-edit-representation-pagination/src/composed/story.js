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

	group(right=false){
		return this.props.children
			.reduce((groups,a)=>{
				if(a.props.x!=undefined){
					if(right){
						groups.push({located:a,words:[]})
					}else{
						groups[groups.length-1].located=a
						groups.push({words:[]})
					}
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

	right(){
		return this.group(true)
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
		return this
			.group()
			.reduce((state, {words, endingWhitespaces,located})=>{
				const width=(located ? located.props.x : this.props.width)-state.x
				const wordsWidth=contentWidth(words)
				state.centerized.push(
					<Group x={state.x+(width-wordsWidth)/2} key={state.centerized.length}>
						{
							words.concat(endingWhitespaces).reduce((status,word,key)=>{
								status.pieces.push(React.cloneElement(word,{x:status.x,key}))
								status.x+=word.props.width
								return status
							},{x:0,pieces:[]}).pieces
						}
					</Group>
				)

				if(located){
					state.centerized.push(React.cloneElement(located,{key:state.centerized.length}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0, centerized:[]}).centerized
	}

	justify(){
		return this
			.group()
			.reduce((state,{words,endingWhitespaces,located})=>{
				let len=state.justified.length
				const width=(located ? located.props.x : this.props.width)-state.x
				const {whitespaces,contentWidth}=words.reduce((status,a,i)=>{
					if(isWhitespace(a)){
						status.whitespaces.push(i)
					}else{
						status.contentWidth+=a.props.width
					}
					return status
				},{contentWidth:0,whitespaces:[]})
				const whitespaceWidth=whitespaces.length>0 ? (width-contentWidth)/whitespaces.length : 0
				words.concat(endingWhitespaces).reduce((x,word,i)=>{
					state.justified.push(React.cloneElement(word,{x,key:len++}))
					return x+(whitespaces.includes(i) ? whitespaceWidth : word.props.width)
				},state.x)

				if(located){
					state.justified.push(React.cloneElement(located,{key:len++}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0,justified:[]}).justified
	}

	both(){
		return this.justify()
	}

	static Info=class{
		constructor({width,height,blocks=[],anchors}){
			this.width=width
			this.availableHeight=height
			this.content=[]
			this.blocks=blocks.map(({x,width})=><Group {...{x,width,height:0}}/>)
			this.anchors=anchors

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
			return this
		}

		isEmpty(){
			return !!this.content.find(({props:{x}})=>x!=undefined)
		}

		get currentX(){
			return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
		}

		includes(anchor){
			return this.anchors.includes(anchor.props["data-content"])
		}
	}
}
