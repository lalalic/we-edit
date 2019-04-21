import React, {Children,Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import {Group,Text} from "../../composed"

import Merge from "./merge"


export default class Story extends Component{
	static displayName="story"
	render(){
		const {children, align="left"}=this.props
		const aligned=this[align]()
		const ender=children.find(a=>a.props.className=="ender")
		if(ender){
			const {children}=aligned[aligned.length-1].props
			if(children.length>0){
				const {x=0,width=0}=children[children.length-1].props
				children.push(React.cloneElement(ender,{key:"ender",x:x+width}))
			}else{
				children.push(React.cloneElement(ender,{key:"ender"}))
			}
		}
		
		return <Group className="story" children={this.baseline(aligned)}/>
	}
	
	baseline(content){
		const baseline=this.props.children.reduce((h,{props:{height,descent=0}})=>Math.max(h,height-descent),0)
		const setBaseline=a=>{
			if(a.props.className=="story"){
				return a
			}
			if(a.type==Text){
				return React.cloneElement(a,{y:baseline})
			}else if(Array.isArray(a.props.children)){
				return React.cloneElement(a, {children:a.props.children.reduce((children,b,i)=>{
					children[i]=setBaseline(b)
					return children
				},[])})
			}else if(a.props.children){
				return React.cloneElement(a, {children:setBaseline(a.props.children)})
			}
			return a
		}
		return setBaseline(<Group children={content}/>).props.children
	}

	group(right=false){
		return this.props.children.filter(a=>a.props.className!="ender")
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


	left(){
		return this.group()
			.reduce((state, {words, endingWhitespaces,located})=>{
				state.aligned.push(
					React.cloneElement(
						new Merge({
							x:state.x,
							children:[...words,...endingWhitespaces].map((a,key)=>React.cloneElement(a,{key}))
						}).render(),
						{key:state.aligned.length}
					)
				)
				if(located){
					state.aligned.push(React.cloneElement(located,{key:state.aligned.length}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0, aligned:[]})
			.aligned
	}
	right(){
		return this.group(true)
			.reduceRight((state, {located,words,endingWhitespaces})=>{
				if(endingWhitespaces.length>0){
					state.aligned.push(
						React.cloneElement(
							new Merge({
								x:state.x,
								children:endingWhitespaces.map((a,key)=>React.cloneElement(a,{key}))
							}).render(),
							{key:state.aligned.length}
						)
					)
				}

				state.x=words.reduce((x,a)=>x-a.props.width,state.x)
				state.aligned.push(
					React.cloneElement(
						new Merge({
							x:state.x,
							children:words.map((a,key)=>React.cloneElement(a,{key}))
						}).render(),
						{key:state.aligned.length}
					)
				)

				if(located){
					state.aligned.push(React.cloneElement(located,{key:state.aligned.length}))
					state.x=located.props.x
				}
				return state
			},{x:this.props.width,aligned:[]})
			.aligned
			.reverse()
	}

	center(){
		const contentWidth=pieces=>pieces.reduce((w,a)=>w+a.props.width,0)
		return this
			.group()
			.reduce((state, {words, endingWhitespaces,located})=>{
				const width=(located ? located.props.x : this.props.width)-state.x
				const wordsWidth=contentWidth(words)
				state.aligned.push(
					React.cloneElement(
						new Merge({
							x:state.x+(width-wordsWidth)/2,
							children:words.concat(endingWhitespaces).map((a,key)=>React.cloneElement(a,{key}))
						}).render(),
						{key:state.aligned.length}
					)
				)

				if(located){
					state.aligned.push(React.cloneElement(located,{key:state.aligned.length}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0, aligned:[]}).aligned
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
}

function isWhitespace(a){
	return new ReactQuery(a).findFirst(`.whitespace`).length>0
}

