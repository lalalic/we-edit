import React, {Children, Component} from "react"
import PropTypes from "prop-types"

import Paragraph from "./paragraph"

export default function(Models){
	const Super=Paragraph(Models)
	return class extends Super{
		static displayName="docx-list"
		static namedStyle="*numbering"
		static propTypes={
			...Super.propTypes,
			num:PropTypes.shape({
				numId: PropTypes.string.isRequired,
				ilvl: PropTypes.string.isRequired
			}).isRequired,
			indentList: PropTypes.shape({
				left: PropTypes.number,
				hanging: PropTypes.number
			})
		}

		static contextTypes={
			...Super.contextTypes,
			label: PropTypes.func,
			styles: PropTypes.object
		}

		componentWillReceiveProps(next,{styles}){
			super.componentWillReceiveProps(...arguments)
			const {numId,ilvl:level}=next.num
			
			const numStyle=styles[`_num_${numId}`]
			
			this.label=this.getLabel(numStyle,numId,level)
			this.label={...this.label,...this.getChildContext().r}
			
			let indentList={...numStyle.get(`${level}.p.indent`)}
			if(this.style.indent){
				const {left=0,hanging=0}=this.style.indent
				this.style.indent.left=Math.max(left+hanging,indentList.left)
			}else {
				this.style.indent=indentList
			}
			this.style.labelWidth=Math.max(this.style.indent.hanging||0,indentList.hanging)
			delete this.style.indent.hanging
			
			this.style.numId=numId
			this.style.level=level
		}
		
		getLabel(numStyle,id,level){
			let label=numStyle.level(level).invoke(`next`)
			return "fonts,size,color".split(",")
				.reduce((props,key, t)=>{
					if(t=numStyle.get(`${level}.r.${key}`)!=undefined)
						props[key]=t
					return props
				},"bold,italic,vanish".split(",")
					.reduce((o,key,t)=>{
						if((t=numStyle.get(`${level}.r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},{children:label})
				)
		}

		render(){
			return <Models.List {...this.style} children={this.children}
				label={<Models.Text {...this.label} id={`${this.props.numId}_${this.props.level}`}/>}/>
		}
	}
}