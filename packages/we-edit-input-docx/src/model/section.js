import React, {Component} from "react"
import TestRenderer from 'react-test-renderer'

import PropTypes from "prop-types"
import {ReactQuery, render} from  "we-edit"

import get from "lodash.get"

export default ({Template,Frame})=>{
	class Page extends Frame{
		defineProperties(){
			this.section=this.context.parent
			const {width,height,margin,cols,named,i}=this.props
			const typed=type=>[(i==1 ? "first" :false),(i%2==0 ? "even" : "odd"),'default']
				.filter(a=>!!a)
				.reduce((found,a)=>found || named(`${type}.${a}`),null)

			const header=typed("header")
			const footer=typed("footer")

			var y0=margin.top
			if(header){
			  	this.computed.composed.push(
					React.cloneElement(header,{x:margin.left,y:margin.header, className:"header"})
				)
				y0=Math.max(y0, margin.header+header.props.height)
			}

			var y1=height-margin.bottom
			if(footer){
				let y=height-margin.footer-footer.props.height
				this.computed.composed.push(
					React.cloneElement(footer,{x:margin.left,y, className:"footer"})
				)
				y1=Math.min(y, y1)
			}

			this.createColumn=()=>Object.assign(super.createColumn(),{
				height:y1-y0,
				y:y0,
			})


			super.defineProperties()
			Object.defineProperties(this,{
				composedHeight:{
					enumerable:false,
					configurable:false,
					get(){
						if(this==this.section.current){//last
							if(!this.section.isAllChildrenComposed()){
								return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
							}
						}
						return this.props.height
					}
				},
				prev:{
					enumerable:true,
					configurable:true,
					get(){
						return this.section.prev
					}
				}
			})
		}

		createComposed2Parent(){
			const {i:key,width,height,margin}=this.props
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin,className:"page frame"})
		}
	}

	class Locatable extends Page{
		includes(id,at){

		}

		position(id,at){

		}

		removeFrom(lineIndex){
			return super.rollbackLines(this.lines.length-lineIndex,false)
		}
	}

	return class extends Component{
		static displayName="section"
		static propTypes={
			cols: PropTypes.shape({
				num: PropTypes.number.isRequired,
				space: PropTypes.number,
				data: PropTypes.arrayOf(PropTypes.shape({
					width: PropTypes.number,
					space: PropTypes.number
				}))
			}),
			titlePg:PropTypes.bool
		}

		static defaultProps={
			cols:{
				num:1
			}
		}

		static contextTypes={
			evenAndOddHeaders: PropTypes.bool
		}

		render(){
			const {children, pgSz,  pgMar, cols:{num=1, space=0, data}, ...props}=this.props

			const getLayout=(section=this)=>{
				const {children, pgSz:{width,height},  pgMar:margin, cols:{num=1, space=0, data}, ...props}=section.props
				const availableWidth=width-margin.left-margin.right
				const cols=(data ? data : new Array(num).fill({width:(availableWidth-(num-1)*space)/num,space}))
					.reduce((state,{width,space})=>{
						state.columns.push({x:state.x, width})
						state.x+=(space+width)
						return state
					},{x:margin.left,columns:[]})
					.columns
				return {
					width:availableWidth,
					cols
				}
			}

			const create=(props,context)=>{
				
				return new Locatable({width,height,margin,cols,...props},context)
			}

			const frame=(<Frame {...getLayout(this)} children={[]} key={0}/>)
			return(
				<Template create={create} {...props}>
				{
					children.reduce((frames, child, i)=>{
						if(child.type.displayName=="section"){
							const {pgSz, pgMar, cols, ...props}=child.props
							frames.push(React.cloneElement(frame,{
								...getLayout(child),
								key:frames.length+1,
								...props,
							}))
							if(i!=children.lenght-1){
								frames.push(React.cloneElement(frame,{key:frames.length+1}))
							}
						}else{
							frames[frames.length-1].props.children.push(child)
						}
						return frames
					},[frame])
				}
				</Template>
			)
		}
	}
}
