import React, {Component} from "react"
import {ReactQuery} from "we-edit"

import {Group,Text} from "../../../composed"

import Merge from "./merge"

/**
 * 1. align
 * 2. set baseline
 * 3. merge to simplify dom structure for performance
 */
export default class Story extends Component{
	static displayName="story"
	render(){
		const {children, align="left"}=this.props
		const baseline=children.reduce((h,{props:{height=0,descent=0}})=>Math.max(h,height-descent),0)
		const aligned=this[align]()
		return (
			<Group className="story" 
				baseline={baseline} 
				children={this.baseline(aligned,baseline)}
				/>
		)
	}
	/**
	 * deeply set baseline for each text content
	 * @param {} content 
	 * @param {*} baseline 
	 */
	baseline(content,baseline){
		const setBaseline=a=>{
			if(Array.isArray(a)){
				return a.map(a=>setBaseline(a))
			}
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
			}else if(a.props.height!=undefined){
				return React.cloneElement(a, {y:baseline-a.props.height})
			}
			return a
		}
		return setBaseline(<Group children={content}/>).props.children
	}

	/**
	 * Group unpositioned for each positioned
	 * *** last group should ignore minWidth==0 element for alignment
	 * @param {*} right 
	 */
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
			.map((group,_i,_a,isLast=_i==_a.length-1)=>{
				let i=group.words.length-
						Array.from(group.words)
							.reverse()
							.findIndex(a=>isLast ? a.props.minWidth!==0 : !isWhitespace(a) )

				group.endingWhitespaces=group.words.slice(i)
				group.words=group.words.slice(0,i)
				return group
			})
	}

	left(){
		return this.group()
			.reduce((state, {words, endingWhitespaces,located})=>{
				if(words.length+endingWhitespaces.length){
					state.aligned.push(
						React.cloneElement(
							new Merge({
								x:state.x,
								children:[...words,...endingWhitespaces].map((a,key)=>React.cloneElement(a,{key}))
							}).render(),
							{key:state.aligned.length}
						)
					)
				}
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
				if(words.length){
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
				}
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
				if(words.length+endingWhitespaces.length){
					const width=(located ? located.props.x : this.props.width)-state.x
					const wordsWidth=contentWidth(words)
					state.aligned.push(
						React.cloneElement(
							new Merge({
								x:state.x+(width-wordsWidth)/2,
								children:[...words,...endingWhitespaces].map((a,key)=>React.cloneElement(a,{key}))
							}).render(),
							{key:state.aligned.length}
						)
					)
				}
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
				const whitespaceWidth=whitespaces.length>0 ? (width-contentWidth)/whitespaces.length : 0;
				[...words,...endingWhitespaces].reduce((x,word,i)=>{
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
