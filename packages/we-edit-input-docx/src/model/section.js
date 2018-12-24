import React, {Component} from "react"
import TestRenderer from 'react-test-renderer'

import PropTypes from "prop-types"
import {ReactQuery, render} from  "we-edit"

import get from "lodash.get"

export default ({Template,Frame, Container})=>{
	var Locatable=null
	if(!Locatable && Frame.Collective){
		class Page extends Frame.Collective{
			defineProperties(){
				this.section=this.context.parent
				super.defineProperties()
				Object.defineProperties(this,{
					prev:{
						enumerable:true,
						configurable:true,
						get(){
							return this.section.prev
						}
					},
					currentLayout:{
						enumerable:true,
						configurable:true,
						get(){
							if(this.prev){
								const id=this.prev.lastLine.props["data-content"]
								return this.props.layouts.find(a=>a.id==id)
							}else{
								return this.props.layouts[0]
							}
						}
					},
					layout:{
						enumerable:true,
						configurable:true,
						get(){
							return this.frames[0].props.margin
						}
					}
				})

				const {width,height,layouts,named,i}=this.props
				const [{margin,cols}]=layouts
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
				this.y0=y0
				this.y1=y1

				this.createFrame=()=>{
					return new Frame(this.currentLayout, this.context)
				}
			}
		}

		Locatable=class  extends Page{
			defineProperties(){
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
				})
			}

			createComposed2Parent(){
				const {props:{i:key,width,height},layout:{margin}}=this

				return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin,className:"page frame"})
			}

			includes(id,at){

			}

			position(id,at){

			}

			removeFrom(lineIndex){
				return super.rollbackLines(this.lines.length-lineIndex,false)
			}
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
			const {children, pgSz:{width,height},  pgMar, cols:{num=1, space=0, data}, ...props}=this.props

			const getLayout=(section=this)=>{
				const {children, pgSz:{width,height},  pgMar:margin, cols:{num=1, space=0, data}, id,...props}=section.props
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
					cols,
					margin,
					id,
				}
			}
			const layouts=[getLayout(this)]
			const create=(props,context)=>{
				return new Locatable({width,height,layouts,...props},context)
			}

			const frame=(<Frame {...getLayout(this)} children={[]} key={0}/>)
			return(
				<Template create={create} {...props}>
				{
					children.reduce((frames, child, i)=>{
						if(child.type.displayName=="section"){
							const {pgSz, pgMar, cols, type, ...props}=child.props
							layouts.push({...getLayout(child),balance:true})
							frames.push(<Container {...props}/>)
						}else{
							frames.push(child)
						}
						return frames
					},[])
				}
				</Template>
			)
		}
	}
}
