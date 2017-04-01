import React, {Children, Component, PropTypes} from "react"
import Paragraph from "./paragraph"
import {getStyles} from "state/selector"

export default function(Models){
	class List extends Models.List.mixin(Paragraph.extend){
	}
	
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
			label: PropTypes.func
		}

		componentWillReceiveProps(next,context){
			super.componentWillReceiveProps(...arguments)
			this.label=context.label(next.num.numId,next.num.ilvl)
			this.label={...this.label,...this.getChildContext().r}
			const {numId,ilvl:level}=next.num
			
			const styles=getStyles(context.store.getState())
			let indentList={...styles.get([`_num_${numId}`]).get(`${level}.p.indent`)}
			
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

		render(){
			return <List {...this.style}
				label={<Models.Text {...this.label} id={`${this.props.numId}_${this.props.level}`}/>}/>
		}
	}
}