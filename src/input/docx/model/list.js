import React, {Component, PropTypes} from "react"
import Paragraph from "./paragraph"

export default function(Models){
	return class List extends Paragraph(Models){
		static displayName="docx-list"
		static propTypes={
			numId: PropTypes.string,
			level: PropTypes.string,
			indentList: PropTypes.shape({
				left: PropTypes.number.isRequired,
				hanging: PropTypes.number.isRequired
			}).isRequired
		}

		static contextTypes={
			label: PropTypes.func
		}

		componentWillReceiveProps(next,context){
			super.componentWillReceiveProps(...arguments)
			this.label=this.context.label(next.numId,next.level)
			this.label={...this.label,...this.getChildContext().r}
			delete this.style.indentList
			if(this.style.indent){
				const {left=0,hanging=0}=this.style.indent
				this.style.indent.left=Math.max(left+hanging,next.indentList.left)
			}else {
				this.style.indent=next.indentList
			}
			this.style.labelWidth=Math.max(this.style.indent.hanging||0,next.indentList.hanging)
			delete this.style.indent.hanging
		}

		render(){
			return <Models.List {...this.style}
				label={<Models.Text {...this.label} id={`${this.props.numId}_${this.props.level}`}/>}/>
		}
	}
}